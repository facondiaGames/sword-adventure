import { filter } from 'rxjs';
import Container, { Service } from 'typedi';
import { createMachine, interpret } from 'xstate';
import { levelState } from '../LevelState';
import { ModalService } from './ModalService';
import { Util } from '../Util';

@Service()
export class PlayLevelLogicService {
  private stateService;

  private stateEventSubscriptions;

  private modalService = Container.get(ModalService);

  public startStateMachine(): void {
    this.stateEventSubscriptions = levelState
      .pipe(filter((event) => Util.isDefined(event)))
      .subscribe((event) => {
        this.stateService.send({ type: event });
      });
    const gameMachine = this.buildMachine();
    this.stateService = interpret(gameMachine)
      .onTransition((state) => console.log(state.value))
      .start();
  }

  public destroyStateMachine(): void {
    this.stateService.stop();
    this.stateEventSubscriptions.unsubscribe();
  }

  private buildMachine() {
    return createMachine<Context>(
      {
        id: 'play-level-logic',
        initial: 'playing',
        context: {
          coins: 0,
        },
        states: {
          playing: {
            on: {
              COIN_TAKEN: 'afterCoinTaken',
              SWORD_TAKEN: 'success',
            },
          },
          afterCoinTaken: {
            entry: ['updateCoin'],
            always: { target: 'playing' },
          },
          success: {
            type: 'final',
            entry: 'endOfLevel',
          },
        },
      },
      {
        actions: {
          updateCoin: (context) => {
            context.coins += 1;
            console.log('new coin count: ', context.coins);
          },
          endOfLevel: (context) => {
            this.modalService.showEndOfLevelModal(context.coins);
          },
        },
      },
    );
  }
}

interface Context {
  coins: number;
}
