import { Container } from 'typedi';
import {
  reset, spy, verify, when,
} from 'ts-mockito';
import { UIService } from '../services/UIService';
import { MenuScene } from './MenuScene';

describe('MenuScene', () => {
  let uiService: UIService;

  beforeEach(() => {
    uiService = spy(Container.get(UIService));
    when(uiService.showMainMenu()).thenCall(() => { /* do nothing */ });
  });

  afterEach(() => {
    reset(uiService);
  });

  it('should activate the scene together with the graphical interface', () => {
    const scene: MenuScene = new MenuScene();

    scene.onActivate();

    verify(uiService.showMainMenu()).once();
  });
});
