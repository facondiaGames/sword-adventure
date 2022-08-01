import { uiConfig } from '../src/services/DOMService';
import { Game } from '../src/Game';
import { SceneKeys } from '../src/types/BasicTypes';
import { TestScene } from './TestScene';
import { Util } from '../src/Util';

export module ExcaliburTestUtils {

    export async function anExcaliburJSGame(): Promise<{ game: Game; scene: TestScene }> {
      createBodyElements();
      const game: Game = Game.getInstance();
      const scene: TestScene = new TestScene();
      game.add('test-scene', scene);
      await game.start();
      game.goTo('test-scene' as SceneKeys);
      return { game, scene };
    }

    export function createBodyElements() {
      let htmlCanvasElement = document.getElementById(uiConfig.gameCanvaId);
      if (Util.isUndefined(htmlCanvasElement)) {
        htmlCanvasElement = document.createElement('canvas');
        htmlCanvasElement.id = uiConfig.gameCanvaId;
        document.body.appendChild(htmlCanvasElement);
      }

      let joystick = document.getElementById('joystick');
      if (Util.isUndefined(joystick)) {
        joystick = document.createElement('div');
        joystick.id = 'joystick';
        document.body.appendChild(joystick);
      }

      let menu = document.getElementById(uiConfig.menuDivId);
      if (Util.isUndefined(menu)) {
        menu = document.createElement('div');
        menu.id = uiConfig.menuDivId;
        document.body.appendChild(menu);
      }

      let modalContainer = document.getElementById(uiConfig.modalContainerDiv);
      if (Util.isUndefined(modalContainer)) {
        modalContainer = document.createElement('div');
        modalContainer.id = uiConfig.modalContainerDiv;
        document.body.appendChild(modalContainer);
      }
    }

}
