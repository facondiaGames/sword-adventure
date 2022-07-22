import { Engine } from 'excalibur';
import { Container } from 'typedi';
import { ActorType } from '../types/BasicTypes';
import { ExcaliburActor } from './ExcaliburActor';
import { MotionService } from '../services/MotionService';
import { ActorAnimationsKeys } from '../config/graphics/keys/ActorTextureKeys';
import { HorizontalParallaxService } from '../services/HorizontalParallaxService';

export class Player extends ExcaliburActor {
  public type: ActorType = 'player';

  private motionService: MotionService = Container.get(MotionService);

  public onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    this.graphics.use(ActorAnimationsKeys.IDLE);
    this.configureMotionService();
  }

  private configureMotionService() {
    const startMoveFn = () => {
      const horizontalParallaxService = Container.get(HorizontalParallaxService);
      const directionFactor = this.vel.x >= 0 ? 1 : -1;
      horizontalParallaxService.startParallax(directionFactor, this.scene);
    };
    const endMoveFn = () => {
      const horizontalParallaxService = Container.get(HorizontalParallaxService);
      horizontalParallaxService.stopParallax(this.scene);
    };
    this.motionService.setPlayer(this, startMoveFn, endMoveFn);
    this.motionService.setMotionType('keyboard');
  }
}
