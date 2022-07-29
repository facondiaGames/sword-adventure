import {
  ActorArgs, CollisionType, Engine, Scene, Shape, vec,
} from 'excalibur';
import { Container } from 'typedi';
import { Player } from '../actors/Player';
import { ActorFactory } from '../services/ActorFactory';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';
import { Mentor } from '../actors/Mentor';
import { PlayLevelLogicService } from '../services/PlayLevelLogicService';

export class PlayScene extends Scene {
  private actorFactory: ActorFactory = Container.get(ActorFactory);

  private parallaxService: HorizontalParallaxService = Container.get(HorizontalParallaxService);

  private levelLogicService: PlayLevelLogicService = Container.get(PlayLevelLogicService);

  public onInitialize(): void {
    this.addPlayer();
    this.addMentor();
    this.addCoins();
    this.addSword();
    this.parallaxService.configureParallax('playLevel', this);
    this.parallaxService.configureCamera('playLevel', this);
  }

  public onActivate(): void {
    this.levelLogicService.startStateMachine();
  }

  public onDeactivate(_oldScene: Scene, _newScene: Scene): void {
    this.levelLogicService.destroyStateMachine();
  }

  private addPlayer(): void {
    const imageSize = 128;
    const xPos = this.camera.viewport.right / 2;
    const yPos = this.camera.viewport.height - imageSize / 2;
    const parallaxCorrection = 50;
    const adjustedPlayerPos = vec(xPos + parallaxCorrection, yPos);
    const args: ActorArgs = {
      pos: adjustedPlayerPos,
      collisionType: CollisionType.Active,
      collider: Shape.Box(96, 128),
    };
    const player: Player = this.actorFactory.createPlayer(args);
    this.add(player);
  }

  private addMentor(): void {
    const imageSize = 92;
    const xPos = this.camera.viewport.right / 3;
    const yPos = this.camera.viewport.height - imageSize / 2;
    const pos = vec(xPos, yPos);
    const args: ActorArgs = {
      pos,
      collisionType: CollisionType.Active,
      collider: Shape.Box(66, imageSize),
    };
    const mentor: Mentor = this.actorFactory.createMentor(args);
    this.add(mentor);
  }

  private addCoins(): void {
    const imageSize = 90;
    const yPos = this.camera.viewport.height - imageSize / 2;
    const pos1 = vec(this.camera.viewport.right - 10, yPos);
    const pos2 = vec(this.camera.viewport.right + 200, yPos);
    const args1: ActorArgs = {
      pos: pos1,
      collisionType: CollisionType.Passive,
      collider: Shape.Box(imageSize, imageSize),
    };
    const args2: ActorArgs = {
      pos: pos2,
      collisionType: CollisionType.Passive,
      collider: Shape.Box(imageSize, imageSize),
    };
    const coin1 = this.actorFactory.createLevelStateModifier('coin', args1);
    const coin2 = this.actorFactory.createLevelStateModifier('coin', args2);
    this.add(coin1);
    this.add(coin2);
  }

  private addSword(): void {
    const imageSize = 128;
    const yPos = this.camera.viewport.height - imageSize / 2;
    const pos = vec(this.camera.viewport.right + 400, yPos);
    const args: ActorArgs = {
      pos,
      collisionType: CollisionType.Passive,
      collider: Shape.Box(imageSize, imageSize),
    };
    const sword = this.actorFactory.createLevelStateModifier('sword', args);
    this.add(sword);
  }
}
