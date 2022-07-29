import { LevelStateModifierType } from '../types/BasicTypes';
import { ExcaliburActor, ActorConfig } from './ExcaliburActor';
import { ActorArgs, Engine } from 'excalibur';
import { ActorAnimationsKeys } from '../config/graphics/keys/ActorTextureKeys';


export class LevelStateModifier extends ExcaliburActor {

    public type: LevelStateModifierType;

    constructor(type: LevelStateModifierType, actorArgs:ActorArgs, actorConfig: ActorConfig){ 
        super(actorArgs,actorConfig);
        this.type = type;
    }

    public onInitialize(_engine: Engine) {
        super.onInitialize(_engine);
        this.graphics.use(ActorAnimationsKeys.IDLE);
      }

}
