import { MotionService } from '../src/services/MotionService';
import { Actor, Events } from 'excalibur';
import { TestScene } from './TestScene';
import { ExcaliburTestUtils } from './ExcaliburTestUtil';
import { anything, instance, mock, reset, spy, verify, when } from 'ts-mockito';
import { Game } from '../src/Game';
import { Keyboard } from 'excalibur/build/dist/Input/Keyboard';
import { Container } from 'typedi';
import { JoystickFactory } from '../src/services/JoystickFactory';
import { JoystickManager } from 'nipplejs';

describe('MotionService', () => {

    let motionService: MotionService;
    let joystickFactorySpy: JoystickFactory;
    let testScene: TestScene;
    let testGame: Game;

    beforeEach(async () => {
        const {scene, game} = await ExcaliburTestUtils.anExcaliburJSGame();
        testScene = scene;
        testGame = game;
        joystickFactorySpy = spy(Container.get(JoystickFactory));
    });

    afterEach(() => {
        reset(joystickFactorySpy);
    });

    it('should register keyboard listeners and unregister joystick listener', () => {
        const actor: Actor = new Actor();
        testScene.add(actor);
        motionService = new MotionService();
        const emptyFunction = () => {/* do nothing */}
        motionService.setPlayer(actor, emptyFunction, emptyFunction);
        const keyboardSpy: Keyboard = spy(testScene.engine.input.keyboard);

        motionService.setMotionType('keyboard');

        const {Hold, Release} = Events.EventTypes;
        verify(keyboardSpy.on(Hold, anything())).once();
        verify(keyboardSpy.on(Release, anything())).once();
        verify(joystickFactorySpy.destroy()).once();
    });

    it('should register joystick listener and unregister keyboard listener', () => {
        const actor: Actor = new Actor();
        testScene.add(actor);
        motionService = new MotionService();
        const emptyFunction = () => {/* do nothing */}
        motionService.setPlayer(actor, emptyFunction, emptyFunction);
        const keyboardSpy: Keyboard = spy(testScene.engine.input.keyboard);
        const joystickManagerMock: JoystickManager = mock(JoystickManager);
        when(joystickFactorySpy.getJoystick()).thenReturn(instance(joystickManagerMock))

        motionService.setMotionType('joystick');

        verify(joystickFactorySpy.destroy()).never();
        verify(joystickManagerMock.on('move', anything())).once();
        verify(joystickManagerMock.on('end', anything())).once();
        const {Hold, Release} = Events.EventTypes;
        [Hold, Release].forEach(event => verify(keyboardSpy.off(event)).once());
    });

});
