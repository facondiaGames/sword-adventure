import {
  Actor, ActorArgs, EasingFunctions, Engine, vec,
} from 'excalibur';
import Container from 'typedi';
import { LevelEvents, LevelStateModifierType } from '../types/BasicTypes';
import { ExcaliburActor, ActorConfig } from './ExcaliburActor';
import { ActorAnimationsKeys } from '../config/graphics/keys/ActorTextureKeys';
import { levelState } from '../LevelState';
import { Tags } from '../config/Tags';
import { ExcaliburActionService } from '../services/ExcaliburActionService';

export class LevelStateModifier extends ExcaliburActor {
  public type: LevelStateModifierType;

  private excaliburActionService = Container.get(ExcaliburActionService);

  constructor(type: LevelStateModifierType, actorArgs:ActorArgs, actorConfig: ActorConfig) {
    super(actorArgs, actorConfig);
    this.type = type;
  }

  public onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    this.graphics.use(ActorAnimationsKeys.IDLE);
    this.on('collisionstart', ({ other }) => {
      if (other.tags.includes(Tags.ACTORS.player)) {
        const eventName: LevelEvents = this.type === 'coin' ? 'COIN_TAKEN' : 'SWORD_TAKEN';
        const callbackFn = () => {
          levelState.next(eventName);
          this.kill();
        };
        if (this.type === 'coin') {
          this.excaliburActionService.easeAndCall(this, callbackFn);
        } else {
          this.excaliburActionService.fadeAndCall(this, callbackFn);
        }
      }
    });
  }
}
