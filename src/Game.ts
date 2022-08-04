import {
  Engine, EngineOptions, Loader, Physics, vec,
} from 'excalibur';
import { Container } from 'typedi';
import { EngineOptionsFactory } from './services/EngineOptionsFactory';
import { PlayScene } from './scenes/PlayScene';
import { SceneKeys } from './types/BasicTypes';
import { allResources } from './config/AllResources';
import { GameConfigService } from './services/GameConfigService';
import { MenuScene } from './scenes/MenuScene';
import { LanguageService } from './services/LanguageService';
import { Translation } from './config/Translation';
import { Util } from './Util';
import { SceneTransitions } from './scenes/SceneTransitions';

export class Game extends Engine {
  private static game: Game;

  private static gameConfigService = Container.get(GameConfigService);

  private static scenesInfo: SceneInfo = {
    playLevel: { key: 'playLevel', ctor: PlayScene },
    menuLevel: { key: 'menuLevel', ctor: MenuScene },
  };

  public static getInstance(): Game {
    if (this.game === undefined || this.game === null) {
      const engineOptionFactory: EngineOptionsFactory = Container.get(EngineOptionsFactory);
      const options: EngineOptions = engineOptionFactory.buildOptions();
      this.game = new Game(options);
      Object.values(this.scenesInfo).forEach(({ key, ctor }) => {
        this.game.addScene(key, new ctor());
      });
      const { gravity } = Game.gameConfigService.getPhysicsConfig();
      Physics.gravity = vec(gravity.x, gravity.y);
    }
    return this.game;
  }

  private constructor(options: EngineOptions) {
    super(options);
  }

  public startCustomLoader(): Promise<void> {
    const loader: Loader = new Loader(allResources);
    this.logLoadingProgress(loader);
    loader.backgroundColor = '#145DA0';
    loader.startButtonFactory = () => {
      const progressLoggerElement: HTMLElement = document.getElementById('loader-progress');
      progressLoggerElement.textContent = '100%';
      const ionButton = document.createElement('ion-button');
      const languageService = Container.get(LanguageService);
      ionButton.textContent = languageService.translate(Translation.keys.playSwordAdventure);
      ionButton.setAttribute('expand', 'fill');
      // TODO: the button is not centered, why? see also index.css -> #excalibur-play-root rule.
      return ionButton as any as HTMLButtonElement;
    };
    return Game.getInstance().start(loader);
  }

  public goTo({toScene, fromScene}: GoToSceneConfig): void {
    this.endSceneTransitions(fromScene).then(async () => {
      await this.prepareSceneAndGoto(toScene);
    });
  }

private async prepareSceneAndGoto(toScene: SceneKeys): Promise<void> {
    const {prepareScene,sceneStart} = SceneTransitions.transitions[toScene];
    await prepareScene();
    sceneStart().then(()=> {
      Game.getInstance().goToScene(toScene);
    });
}

private endSceneTransitions(fromScene: SceneKeys): Promise<any> {
    if (Util.isDefined(fromScene)) {
        const {sceneEnds} = SceneTransitions.transitions[fromScene];
        const currentScene = Game.getInstance().currentScene;
        return sceneEnds(currentScene)
    } else {
        return Promise.resolve();
    }
}

  private logLoadingProgress(loader: Loader, timeout = 2000, interval = 100) {
    const progressLoggerElement: HTMLElement = document.getElementById('loader-progress');
    // repeatedly poll check
    const poller = setInterval(() => {
      const progressPercent: number = Math.trunc(loader.progress * 100);
      progressLoggerElement.textContent = `${progressPercent}%`;
      if (loader.isLoaded()) {
        clearInterval(poller);
      }
    }, interval);
    setTimeout(() => clearInterval(poller), timeout);
  }
}

type SceneInfo = { [key in SceneKeys]: { key: key, ctor: any } };
type GoToSceneConfig = { toScene: SceneKeys, fromScene?: SceneKeys };