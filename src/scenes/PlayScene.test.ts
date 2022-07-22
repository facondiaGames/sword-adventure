import { Container } from 'typedi';
import {
  anything, reset, spy, verify,
} from 'ts-mockito';
import { Actor } from 'excalibur';
import { PlayScene } from './PlayScene';
import { ActorFactory } from '../services/ActorFactory';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';
import { Tags } from '../config/Tags';

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

  it('should initialize the scene with a player actor', () => {
    const scene: PlayScene = new PlayScene();

    scene.onInitialize();

    const playerActors: Actor[] = scene.actors.filter((actor) => actor.tags.includes(Tags.ACTORS.player));
    expect(playerActors.length).toBe(1);
    const mentorActors: Actor[] = scene.actors.filter((actor) => actor.tags.includes(Tags.ACTORS.mentor));
    expect(mentorActors.length).toBe(1);
    verify(actorFactory.createPlayer(anything())).once();
    verify(actorFactory.createMentor(anything())).once();
    verify(parallaxService.configureParallax('playLevel', scene)).once();
  });
});
