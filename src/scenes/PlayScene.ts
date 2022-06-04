import { ActorArgs, CollisionType, Scene, Shape, vec } from "excalibur";
import { Player } from '../actors/Player';
import { Configs } from '../config/GeneralGameConfig';
import { Container } from 'typedi';
import { ActorFactory } from '../services/ActorFactory';

export class PlayScene extends Scene {

    private actorFactory: ActorFactory = Container.get(ActorFactory);

    public onInitialize(): void {
        const {width, height} = Configs.game.size;
        const args: ActorArgs = {
            pos: vec(width / 2, height / 2),
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 100),
        };
        const player: Player = this.actorFactory.createPlayer(args);
        this.add(player);
    }
}
