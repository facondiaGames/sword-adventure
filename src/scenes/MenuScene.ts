import {
  Scene,
} from 'excalibur';
import Container from 'typedi';
import { UIService } from '../services/UIService';

export class MenuScene extends Scene {
  private uiService = Container.get(UIService);

  public onActivate(): void {
    this.uiService.showMainMenu();
  }

  public onDeactivate(): void {
    // next step: clear ui html elements before going to other scenes
  }
}
