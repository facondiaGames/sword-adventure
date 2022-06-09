import { uiConfig } from '../src/services/DOMService';
import { Game } from '../src/Game';
import { SceneKeys } from '../src/types/BasicTypes';
import { TestScene } from './TestScene';

export module ExcaliburTestUtils {

    export async function anExcaliburJSGame(): Promise<{ game: Game; scene: TestScene }> {
        const htmlCanvasElement: HTMLCanvasElement = document.createElement('canvas');
        htmlCanvasElement.id = uiConfig.gameCanvaId;
        document.body.appendChild(htmlCanvasElement);

        const joystick: HTMLElement = document.createElement('joystick');
        document.body.appendChild(joystick);

        const game: Game = Game.getInstance();
        const scene: TestScene = new TestScene();
        game.add('test-scene', scene);
        await game.start();
        game.goTo('test-scene' as SceneKeys);
        return {game, scene};
    }

}

