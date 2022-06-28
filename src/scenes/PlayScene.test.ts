import { PlayScene } from './PlayScene';
import { ActorFactory } from '../services/ActorFactory';
import { Container } from 'typedi';
import { anything, reset, spy, verify } from 'ts-mockito';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';
import { Tags } from '../config/Tags';
import { Actor } from 'excalibur';

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

        const actors: Actor[] = scene.actors.filter(actor => actor.tags.includes(Tags.ACTORS.player));
        expect(actors.length).toBe(1);
        verify(actorFactory.createPlayer(anything())).once();
        verify(parallaxService.configureParallax('playLevel', scene)).once();
    });

});
