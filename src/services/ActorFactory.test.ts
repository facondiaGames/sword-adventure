import {
  ActorArgs, CollisionType, Shape, vec,
} from 'excalibur';
import { ActorFactory } from './ActorFactory';
import { Player } from '../actors/Player';
import { Mentor } from '../actors/Mentor';
import { Tags } from '../config/Tags';

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

    expect(player.tags.includes(Tags.ACTORS.player)).toBe(true);
  });

  it('should create mentor actor', () => {
    const actorArgs: ActorArgs = {
      pos: vec(50, 50),
      collisionType: CollisionType.Active,
      collider: Shape.Box(100, 100),
    };

    const mentor: Mentor = actorFactory.createMentor(actorArgs);

    expect(mentor.tags.includes(Tags.ACTORS.mentor)).toBe(true);
  });
});
