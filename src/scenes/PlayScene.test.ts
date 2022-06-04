import { PlayScene } from './PlayScene';
import { ActorFactory } from '../services/ActorFactory';
import { Container } from 'typedi';
import { anything, reset, spy, verify } from 'ts-mockito';

describe('PlayScene', () => {

    let actorFactory: ActorFactory;

    beforeEach(() => {
        actorFactory = spy(Container.get(ActorFactory));
    });

    afterEach(() => {
        reset(actorFactory);
    });

    it('should initialize the scene with a player actor', () => {
        const scene: PlayScene = new PlayScene();

        scene.onInitialize();

        expect(scene.actors.length).toBe(1);
        verify(actorFactory.createPlayer(anything())).once();
    });

});
