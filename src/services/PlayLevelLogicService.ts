import { filter } from 'rxjs';
import Container, { Service } from 'typedi';
import { createMachine, interpret } from 'xstate';
import { levelState } from '../levelState';
import { UIService } from './UIService';
import { Util } from '../Util';
import { GameStateService } from './GameStateService';

@Service()
export class PlayLevelLogicService {
  private stateService;

  private stateEventSubscriptions;

  private uiService = Container.get(UIService);

  private gameStateService = Container.get(GameStateService);

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
          coins: this.gameStateService.getCoinCount(),
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
            this.gameStateService.setCoinCount(context.coins);
          },
          endOfLevel: (context) => {
            this.uiService.showEndOfLevelModal(context.coins);
          },
        },
      },
    );
  }
}

interface Context {
  coins: number;
}
