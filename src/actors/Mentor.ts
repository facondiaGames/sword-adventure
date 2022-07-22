import { Engine } from 'excalibur';
import { Container } from 'typedi';
import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { ActorAnimationsKeys } from '../config/graphics/keys/ActorTextureKeys';
import { QueryManagerService } from '../services/QueryManagerService';
import { IFrameService } from '../services/IFrameService';

export class Mentor extends ExcaliburActor {
  public type: ActorType = 'mentor';

  private queryManagerService = Container.get(QueryManagerService);

  private iFrameService = Container.get(IFrameService);

  public onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    this.graphics.use(ActorAnimationsKeys.IDLE);
    this.on('pointerdown', () => {
      this.iFrameService.toggleIFrame(true);
    });
  }

  public onPostUpdate(_engine: Engine, _delta: number) {
    const player = this.queryManagerService.getPlayer(_engine.currentScene);
    const playerIsNear = player.pos.distance(this.pos) < 150;
    if (playerIsNear) {
      this.graphics.use(ActorAnimationsKeys.HELLO);
    } else {
      this.graphics.use(ActorAnimationsKeys.IDLE);
    }
  }
}
