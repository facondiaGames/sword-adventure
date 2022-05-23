import {DisplayMode, EngineOptions, Input} from 'excalibur';
import {uiConfig} from './DOMService';
import {Service} from 'typedi';
import {Configs} from "../config/GeneralGameConfig";

@Service()
export class EngineOptionsFactory {

    public buildOptions(): EngineOptions {
        const {width, height} = Configs.game.size;
        return {
            width,
            height,
            displayMode: DisplayMode.FillContainer,
            /** I use this option because of the hack I did to deploy the game inside a Joomla article. Use FillScreen if it suits better!**/
            canvasElementId: uiConfig.gameCanvaId,
            pointerScope: Input.PointerScope.Canvas,
        };
    }

}
