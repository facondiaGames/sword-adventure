import { Container, Service } from 'typedi';
import {
  Actor, Color, Rectangle, Scene,
} from 'excalibur';
import { MotionService, MotionTypes } from './services/MotionService';
import { Game } from './Game';

@Service()
export class DevelService {
  private motionService: MotionService = Container.get(MotionService);

  private gameDebugOn: boolean = false;

  public showDevelopmentTools(): void {
    const containerDiv: HTMLDivElement = document.createElement('div');
    containerDiv.id = 'dev-tools';
    containerDiv.classList.add('flex-row', 'absolute-top');
    const motionTypes: MotionTypes[] = ['keyboard', 'joystick'];
    motionTypes.forEach((type) => {
      this.createMotionTypeButton(type, containerDiv);
    });
    this.createCameraDebugButton(containerDiv);
    this.createGameDebugButton(containerDiv);
    this.createEndOfLevelModalButton(containerDiv);
    document.body.appendChild(containerDiv);
  }

  private createCameraDebugButton(containerDiv: HTMLDivElement) {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = 'debug camera';
    button.onclick = () => {
      const game = Game.getInstance();
      const { currentScene } = game;
      this.debugCamera(currentScene);
    };
    containerDiv.appendChild(button);
  }

  private debugCamera(scene: Scene): void {
    const actor = new Actor();
    const rec = new Rectangle({ color: Color.Red, height: 10, width: 10 });
    actor.graphics.use(rec);
    actor.on('preupdate', () => {
      actor.pos = scene.camera.pos;
    });
    actor.z = 11;
    scene.add(actor);
  }

  private createMotionTypeButton(motionType: MotionTypes, containerDiv: HTMLDivElement) {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = motionType;
    button.onclick = () => {
      this.motionService.setMotionType(motionType);
    };
    containerDiv.appendChild(button);
  }

  private createGameDebugButton(containerDiv: HTMLDivElement) {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = 'game debug';
    const game = Game.getInstance();
    button.onclick = () => {
      this.gameDebugOn = !this.gameDebugOn;
      game.showDebug(this.gameDebugOn);
    };
    containerDiv.appendChild(button);
  }

  private createEndOfLevelModalButton(containerDiv: HTMLDivElement) {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = 'modal debug';
    const game = Game.getInstance();
    button.onclick = () => {
      game.goTo('menuLevel');
    };
    containerDiv.appendChild(button);
  }
}
