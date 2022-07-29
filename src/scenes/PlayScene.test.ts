import { Container } from 'typedi';
import {
  anything, reset, spy, verify,
} from 'ts-mockito';
import { Actor, Scene } from 'excalibur';
import { PlayScene } from './PlayScene';
import { ActorFactory } from '../services/ActorFactory';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';
import { Tags } from '../config/Tags';
import { ActorType } from 'types/BasicTypes';

describe('PlayScene', () => {
  let actorFactory: ActorFactory;
  let parallaxService: HorizontalParallaxService;

  beforeEach(() => {
    actorFactory = spy(Container.get(ActorFactory));
    parallaxService = spy(Container.get(HorizontalParallaxService));
  });

  afterEach(() => {
    reset(actorFactory);
    reset(parallaxService);
  });

  it('should initialize the scene with its actors', () => {
    const scene: PlayScene = new PlayScene();

    scene.onInitialize();

    verify(actorFactory.createPlayer(anything())).once();
    verify(actorFactory.createMentor(anything())).once();
    verify(actorFactory.createLevelStateModifier('coin', anything())).twice();
    verify(actorFactory.createLevelStateModifier('sword', anything())).once();
    verify(parallaxService.configureParallax('playLevel', scene)).once();
    checkActorTags(scene);
  });

  function checkActorTags(scene: Scene){
    Array.from(Object.entries(Tags.ACTORS)).forEach(([actorType,tag]) => {
        const expected = actorType as any as ActorType === 'coin' ? 2 : 1;
        const actors: Actor[] = scene.actors.filter((actor) => actor.tags.includes(tag));
        expect(actors.length).toBe(expected);
    });

  }

});
