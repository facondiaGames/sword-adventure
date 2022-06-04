import { ActorFactory } from './ActorFactory';
import { ActorArgs, CollisionType, Shape, vec } from 'excalibur';
import { Player } from '../actors/Player';
import { ActorTags } from '../config/ActorTags';

describe('ActorFactory', () => {

    let actorFactory: ActorFactory;

    beforeEach(() => {
        actorFactory = new ActorFactory();
    });

    it('should create player actor', () => {
        const actorArgs: ActorArgs = {
            pos: vec(50, 50),
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 100),
        };

        const player: Player = actorFactory.createPlayer(actorArgs);

        expect(player.tags.includes(ActorTags.TAGS.player)).toBe(true);
    });

});
