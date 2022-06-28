import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { Engine } from 'excalibur';
import { MotionService } from '../services/MotionService';
import { Container } from 'typedi';
import { ActorAnimations } from '../util/ActorAnimations';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';

export class Player extends ExcaliburActor {

    public type: ActorType = 'player';
    private motionService: MotionService = Container.get(MotionService);

    public onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.use(ActorAnimations.IDLE);
        this.configureMotionService();
    }

    private configureMotionService() {
        const startMoveFn = () => {
            const horizontalParallaxService = Container.get(HorizontalParallaxService);
            const directionFactor = this.vel.x >= 0 ? 1 : -1;
            horizontalParallaxService.startParallax(directionFactor, this.scene);
        }
        const endMoveFn = () => {
            const horizontalParallaxService = Container.get(HorizontalParallaxService);
            horizontalParallaxService.stopParallax(this.scene);
        }
        this.motionService.setPlayer(this, startMoveFn, endMoveFn);
        this.motionService.setMotionType('keyboard');
    }
}
