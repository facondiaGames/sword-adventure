import { Engine } from 'excalibur';
import { Container } from 'typedi';
import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { ActorAnimationsKeys } from '../config/graphics/keys/ActorTextureKeys';
import { QueryManagerService } from '../services/QueryManagerService';

export class Mentor extends ExcaliburActor {
  public type: ActorType = 'mentor';

  private queryManagerService = Container.get(QueryManagerService);

  public onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    this.graphics.use(ActorAnimationsKeys.IDLE);
    this.on('pointerdown', () => {
      alert('Hi, let\'s have a chat!');
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
