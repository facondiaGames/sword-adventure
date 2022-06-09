import { Actor, Events, Input, toRadians, Vector } from 'excalibur';
import { ActorAnimations } from '../util/ActorAnimations';
import { Container, Service } from 'typedi';
import { JoystickFactory } from './JoystickFactory';
import { JoystickManager } from 'nipplejs';

@Service()
export class MotionService {

    private player: Actor;
    private motionType: MotionTypes = 'keyboard';
    private speedMultiplier: number = 80;
    private yMapping = {up: -1, down: 1};
    private joystickFactory: JoystickFactory = Container.get(JoystickFactory);

    public setPlayer(actor: Actor) {
        this.player = actor;
    }

    public setMotionType(motionType: MotionTypes): void {
        this.motionType = motionType;
        if (this.motionType === 'keyboard') {
            this.registerKeyboardListeners(true);
            this.registerJoystickListener(false);
        }
        if (this.motionType === 'joystick') {
            this.registerKeyboardListeners(false);
            this.registerJoystickListener(true);
        }
    }

    private registerKeyboardListeners(on: boolean): void {
        const {Hold, Release} = Events.EventTypes;
        if (!on) {
            [Hold, Release].forEach(event => {
                this.player.scene.engine.input.keyboard.off(event);
            })
            //spegnere altri tipi di controller
        }
        if (on) {
            this.player.scene.engine.input.keyboard.on(Release, () => {
                this.player.vel.setTo(0, 0);
                this.player.graphics.use(ActorAnimations.IDLE);
            });
            this.player.scene.engine.input.keyboard.on(Hold, (evt) => {
                let dir = Vector.Down;
                let horizontalFlip = false;
                switch (evt.key) {
                    case Input.Keys.A:
                    case Input.Keys.Left:
                        dir = Vector.Left;
                        horizontalFlip = true;
                        break;
                    case Input.Keys.D:
                    case Input.Keys.Right:
                        dir = Vector.Right;
                        break;
                    case Input.Keys.S:
                    case Input.Keys.Down:
                        dir = Vector.Down;
                        break;
                    case Input.Keys.W:
                    case Input.Keys.Up:
                        dir = Vector.Up;
                        break;
                    default:
                        return;
                }
                const speed: Speed = {x: dir.x * this.speedMultiplier, y: dir.y * this.speedMultiplier};
                this.run(speed, horizontalFlip);
            });
        }

    }

    private registerJoystickListener(on: boolean): void {
        if (!on) {
            this.joystickFactory.destroy();
        }
        if (on) {
            const joystickManager: JoystickManager = this.joystickFactory.getJoystick();
            joystickManager.on('move', (event, data) => {
                const {vector, direction} = data;
                if (direction?.x && direction?.y) {
                    const yMapper: number = this.yMapping[direction.y];
                    const speed: Speed = {x: vector.x * this.speedMultiplier, y: Math.abs(vector.y) * yMapper * this.speedMultiplier};
                    const horizontalFlip: boolean = direction.angle === 'left';
                    this.run(speed, horizontalFlip);
                }
            });
            joystickManager.on('end', () => {
                this.player.rotation = toRadians(0);
                this.player.vel.setTo(0, 0);
                this.player.graphics.use(ActorAnimations.IDLE);
            });
        }
    }

    private run({x, y}: Speed, horizontalFlip: boolean) {
        this.player.vel.setTo(x, y);
        this.player.graphics.use(ActorAnimations.RUN);
        this.player.graphics.getGraphic(ActorAnimations.RUN).flipHorizontal = horizontalFlip;
    }

}

export type MotionTypes = 'keyboard' | 'joystick';
type Speed = { x: number; y: number };
