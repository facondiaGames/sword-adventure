import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { Engine } from 'excalibur';

export class Player extends ExcaliburActor {

    public type: ActorType = 'player';

    public onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.use('idle');
    }

}
