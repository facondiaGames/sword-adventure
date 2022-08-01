import { Container } from 'typedi';
import {
  reset, spy, verify,
} from 'ts-mockito';
import { DOMService, uiConfig } from '../src/services/DOMService';
import { ExcaliburTestUtils } from './ExcaliburTestUtil';
import { UIService } from '../src/services/UIService';

describe('UIService', () => {
  let domServiceSpy: DOMService;
  let uiService: UIService;

  beforeEach(() => {
    uiService = new UIService();
    domServiceSpy = spy(Container.get(DOMService));
    ExcaliburTestUtils.createBodyElements();
  });

  afterEach(() => {
    reset(domServiceSpy);
  });

  it('showEndOfLevelModal', () => {
    uiService.showEndOfLevelModal(5);

    verify(domServiceSpy.toggleElementVisibility('modal-container', true)).once();
    const modal = document.getElementById(uiConfig.endOfLevelModal);
    expect(modal).toBeDefined();
  });

  it('showMainMenu', () => {
    uiService.showMainMenu();

    verify(domServiceSpy.toggleElementVisibility('menu', true)).once();
    verify(domServiceSpy.toggleElementVisibility('modal-container', false)).once();
    const menuElement = document.getElementById(uiConfig.mainMenu);
    expect(menuElement).toBeDefined();
  });
});
