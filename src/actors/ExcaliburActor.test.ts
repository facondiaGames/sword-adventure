import { ActorArgs } from 'excalibur/build/dist/Actor';
import {
  mock, reset, spy, verify,
} from 'ts-mockito';
import { Engine } from 'excalibur';
import { Container } from 'typedi';
import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { GraphicService } from '../services/GraphicService';

describe('ExcaliburActor', () => {
  let graphicService: GraphicService;

  beforeEach(() => {
    graphicService = spy(Container.get(GraphicService));
  });

  afterEach(() => {
    reset(graphicService);
  });

  it('should initialize actor', () => {
    const args: ActorArgs = {} as ActorArgs;
    const actor: ExcaliburActorTest = new ExcaliburActorTest(args, { tag: 'test_tag', collisionGroupKey: 'collisiong_group' });
    const engine: Engine = mock(Engine);

    actor.onInitialize(engine);

    verify(graphicService.registerActorGraphics('player', actor)).once();
    verify(graphicService.registerActorAnimations('player', actor)).once();
  });
});

class ExcaliburActorTest extends ExcaliburActor {
  public COLLISION_GROUP_NAME: string = 'test';

  public type: ActorType = 'player';
}
