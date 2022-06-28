import { ActorArgs, CollisionType, Scene, Shape, vec } from "excalibur";
import { Player } from '../actors/Player';
import { Container } from 'typedi';
import { ActorFactory } from '../services/ActorFactory';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';

export class PlayScene extends Scene {

    private actorFactory: ActorFactory = Container.get(ActorFactory);
    private parallaxService: HorizontalParallaxService = Container.get(HorizontalParallaxService);

    public onInitialize(): void {
        const playerPos = this.camera.viewport.center;
        const parallaxCorrection = 50;
        const adjustedPlayerPos = playerPos.add(vec(parallaxCorrection, 0));
        const args: ActorArgs = {
            pos: adjustedPlayerPos,
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 130),
        };
        const player: Player = this.actorFactory.createPlayer(args);
        this.add(player);
        this.parallaxService.configureParallax('playLevel', this);
    }

}
