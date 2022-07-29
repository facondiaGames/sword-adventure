import { Actor, EasingFunctions, vec } from 'excalibur';
import { Service } from 'typedi';

@Service()
export class ExcaliburActionService {
  public easeAndCall(actor:Actor, callback: () => void) {
    actor.actions.easeTo(vec(actor.pos.x, -100), 800, EasingFunctions.Linear).callMethod(() => {
      callback();
    });
  }

  public fadeAndCall(actor:Actor, callback: () => void) {
    actor.actions.fade(0, 1500).callMethod(() => {
      callback();
    });
  }
}
