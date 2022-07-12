import { ActorArgs, CollisionType, Scene, Shape, vec } from "excalibur";
import { Player } from '../actors/Player';
import { Container } from 'typedi';
import { ActorFactory } from '../services/ActorFactory';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';
import { Mentor } from '../actors/Mentor';

export class PlayScene extends Scene {

    private actorFactory: ActorFactory = Container.get(ActorFactory);
    private parallaxService: HorizontalParallaxService = Container.get(HorizontalParallaxService);

    public onInitialize(): void {
        this.addPlayer();
        this.addMentor();
        this.parallaxService.configureParallax('playLevel', this);
    }

    private addPlayer(): void {
        const playerPos = this.camera.viewport.center;
        const parallaxCorrection = 50;
        const adjustedPlayerPos = playerPos.add(vec(parallaxCorrection, 0));
        const args: ActorArgs = {
            pos: adjustedPlayerPos,
            collisionType: CollisionType.Active,
            collider: Shape.Box(96, 128),
        };
        const player: Player = this.actorFactory.createPlayer(args);
        this.add(player);
    }

    private addMentor(): void {
        const pos = vec(100, this.camera.viewport.left);
        const args: ActorArgs = {
            pos,
            collisionType: CollisionType.Active,
            collider: Shape.Box(66, 92),
        };
        const mentor: Mentor = this.actorFactory.createMentor(args);
        this.add(mentor);
    }
}
