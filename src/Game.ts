import { Engine, EngineOptions, Loader, Physics, vec } from 'excalibur';
import { Container } from 'typedi';
import { EngineOptionsFactory } from './services/EngineOptionsFactory';
import { PlayScene } from "./scenes/PlayScene";
import { SceneKeys } from "./types/BasicTypes";
import { allResources } from './config/AllResources';
import { GameConfigService } from './services/GameConfigService';

export class Game extends Engine {

    private static game: Game;
    private static scenesInfo: SceneInfo = {
        playLevel: {key: 'playLevel', ctor: PlayScene},
    }

    public static getInstance(): Game {
        if (this.game === undefined || this.game === null) {
            const engineOptionFactory: EngineOptionsFactory = Container.get(EngineOptionsFactory);
            const options: EngineOptions = engineOptionFactory.buildOptions();
            this.game = new Game(options);
            Object.values(this.scenesInfo).forEach(({key, ctor}) => {
                this.game.addScene(key, new ctor())
            });
            const gameConfigService = Container.get(GameConfigService);
            const {gravity} = gameConfigService.getPhysicsConfig();
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
        loader.startButtonFactory = () => {
            const progressLoggerElement: HTMLElement = document.getElementById('loader-progress');
            /** we'll replace this button with ionic-react buttons. Stay tuned :) */
            progressLoggerElement.textContent = '100%';
            const simpleButton = document.createElement('button');
            simpleButton.textContent = 'Play Sword Adventure!';
            return simpleButton as any as HTMLButtonElement;
        };
        return Game.getInstance().start(loader);
    }

    public goTo(sceneKey: SceneKeys): void {
        Game.getInstance().goToScene(sceneKey);
    }

    private logLoadingProgress(loader: Loader, timeout = 2000, interval = 100) {
        const progressLoggerElement: HTMLElement = document.getElementById('loader-progress');
        // repeatedly poll check
        const poller = setInterval(() => {
            const progressPercent: number = Math.trunc(loader.progress * 100);
            progressLoggerElement.textContent = progressPercent + '%';
            if (loader.isLoaded()) {
                clearInterval(poller);
            }
        }, interval);
        setTimeout(() => clearInterval(poller), timeout);
    }

}

type SceneInfo = { [key in SceneKeys]: { key: key, ctor: any } };
