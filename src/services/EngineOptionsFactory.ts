import { DisplayMode, EngineOptions, Input } from 'excalibur';
import { Container, Service } from 'typedi';
import { uiConfig } from './DOMService';
import { GameConfigService } from './GameConfigService';

@Service()
export class EngineOptionsFactory {
  private gameConfigService: GameConfigService = Container.get(GameConfigService);

  public buildOptions(): EngineOptions {
    const deviceConfig = this.gameConfigService.getDeviceConfig();
    const { width, height } = deviceConfig.size;
    return {
      width,
      height,
      displayMode: DisplayMode.FillContainer,
      canvasElementId: uiConfig.gameCanvaId,
      pointerScope: Input.PointerScope.Canvas,
    };
  }
}
