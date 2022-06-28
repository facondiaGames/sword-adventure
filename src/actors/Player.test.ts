import { Player } from './Player';
import { ActorConfig } from './ExcaliburActor';
import { ActorArgs, Engine } from 'excalibur';
import { anything, mock, reset, spy, verify, when } from 'ts-mockito';
import { Container } from 'typedi';
import { MotionService } from '../services/MotionService';

describe('Player', () => {

    let player: Player;
    let motionService: MotionService;

    beforeEach(() => {
        const args: ActorArgs = {} as ActorArgs;
        const actorConfig: ActorConfig = {} as ActorConfig;
        player = new Player(args, actorConfig);
        motionService = spy(Container.get(MotionService));
    });

    afterEach(() => {
        reset(motionService);
    });

    it('should initialize the player with keyboard controller', () => {
        const engine: Engine = mock(Engine);
        when(motionService.setMotionType(anything())).thenCall(() => true);

        player.onInitialize(engine);

        verify(motionService.setPlayer(player, anything(), anything())).once();
        verify(motionService.setMotionType('keyboard')).once();
    });

});
