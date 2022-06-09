import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { Engine } from 'excalibur';
import { MotionService } from '../services/MotionService';
import { Container } from 'typedi';
import { ActorAnimations } from '../util/ActorAnimations';

export class Player extends ExcaliburActor {

    public type: ActorType = 'player';
    private motionService: MotionService = Container.get(MotionService);

    public onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.use(ActorAnimations.IDLE);
        this.motionService.setPlayer(this);
        this.motionService.setMotionType('keyboard');
    }

}
