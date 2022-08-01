import {
  Actor, CollisionType, GameEvent, Shape, vec,
} from 'excalibur';
import {
  anything,
  reset,
  spy, verify,
} from 'ts-mockito';
import Container from 'typedi';
import { TestScene } from './TestScene';
import { ExcaliburTestUtils } from './ExcaliburTestUtil';
import { Game } from '../src/Game';
import { LevelStateModifier } from '../src/actors/LevelStateModifier';
import { Tags } from '../src/config/Tags';
import { ExcaliburActionService } from '../src/services/ExcaliburActionService';

describe('LevelStateModifier', () => {
  let testScene: TestScene;
  let testGame: Game;
  let excaliburActionServiceSpy: ExcaliburActionService;

  beforeEach(async () => {
    const { scene, game } = await ExcaliburTestUtils.anExcaliburJSGame();
    testScene = scene;
    testGame = game;
    excaliburActionServiceSpy = spy(Container.get(ExcaliburActionService));
  });

  afterEach(() => {
    reset(excaliburActionServiceSpy);
  });

  it('should do nothing if an actor which is not a player collides', () => {
    const imageSize = 128;
    const pos = vec(100, 100);
    const args = {
      pos,
      collisionType: CollisionType.Passive,
      collider: Shape.Box(imageSize, imageSize),
    };
    const { ACTORS, COLLISION_GROUPS } = Tags;
    const actorConfig = { tag: ACTORS.coin, collisionGroupKey: COLLISION_GROUPS.coin };
    const actor: LevelStateModifier = new LevelStateModifier('coin', args, actorConfig);
    testScene.add(actor);
    const anActor = new Actor();
    testScene.add(anActor);
    actor.onInitialize(testGame);
    anActor.onInitialize(testGame);
    const gameEvent = new GameEvent();
    gameEvent.other = anActor;

    actor.emit('collisionstart', gameEvent);

    verify(excaliburActionServiceSpy.easeAndCall(actor, anything())).never();
    verify(excaliburActionServiceSpy.fadeAndCall(actor, anything())).never();
  });

  it('should ease when player collides and modifier is coin', () => {
    const imageSize = 128;
    const pos = vec(100, 100);
    const args = {
      pos,
      collisionType: CollisionType.Passive,
      collider: Shape.Box(imageSize, imageSize),
    };
    const { ACTORS, COLLISION_GROUPS } = Tags;
    const actorConfig = { tag: ACTORS.coin, collisionGroupKey: COLLISION_GROUPS.coin };
    const actor: LevelStateModifier = new LevelStateModifier('coin', args, actorConfig);
    testScene.add(actor);
    const fakePlayer = new Actor();
    fakePlayer.addTag(Tags.ACTORS.player);
    testScene.add(fakePlayer);
    actor.onInitialize(testGame);
    fakePlayer.onInitialize(testGame);
    const gameEvent = new GameEvent();
    gameEvent.other = fakePlayer;

    actor.emit('collisionstart', gameEvent);

    verify(excaliburActionServiceSpy.easeAndCall(actor, anything())).once();
    verify(excaliburActionServiceSpy.fadeAndCall(actor, anything())).never();
  });

  it('should fade when player collides and modifier is sword', () => {
    const imageSize = 128;
    const pos = vec(100, 100);
    const args = {
      pos,
      collisionType: CollisionType.Passive,
      collider: Shape.Box(imageSize, imageSize),
    };
    const { ACTORS, COLLISION_GROUPS } = Tags;
    const actorConfig = { tag: ACTORS.coin, collisionGroupKey: COLLISION_GROUPS.coin };
    const actor: LevelStateModifier = new LevelStateModifier('sword', args, actorConfig);
    testScene.add(actor);
    const fakePlayer = new Actor();
    fakePlayer.addTag(Tags.ACTORS.player);
    testScene.add(fakePlayer);
    actor.onInitialize(testGame);
    fakePlayer.onInitialize(testGame);
    const gameEvent = new GameEvent();
    gameEvent.other = fakePlayer;

    actor.emit('collisionstart', gameEvent);

    verify(excaliburActionServiceSpy.easeAndCall(actor, anything())).never();
    verify(excaliburActionServiceSpy.fadeAndCall(actor, anything())).once();
  });
});
