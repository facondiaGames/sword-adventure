import Container, { Service } from 'typedi';
import { DOMService, HTMLElementConfig } from './DOMService';
import { LanguageService } from './LanguageService';

@Service()
export class IFrameService {
  private domService: DOMService = Container.get(DOMService);

  private languageService: LanguageService = Container.get(LanguageService);

  /**
     * The IFrame is listening for CLOSE_IFRAME event. If you change this string here, it must be changed on the Twinery project too!
     */
  private closeIframeTwinerySentEvent: string = 'CLOSE_IFRAME';

  private iFrameContainerElement: HTMLElement;

  public init(): void {
    this.iFrameContainerElement = this.domService.getElement('iframe-container');
    this.initWindowListeners();
  }

  public toggleIFrame(show: boolean):void {
    this.domService.toggleElementVisibility('iframe-container', show);
    this.domService.toggleElementVisibility('joystick', !show);
    if (show) {
      const currentLanguage = this.languageService.getCurrentLanguage();
      const filePath = `twinery-dialog/mission_${currentLanguage}.html`;
      const config: HTMLElementConfig = {
        id: 'iframe',
        tagName: 'iframe',
        classes: ['position-absolute', 'position-top', 'full-size'],
        parentContainer: this.iFrameContainerElement,
        attributes: [{ name: 'src', value: filePath }],
      };
      this.domService.createHTMLElement(config);
    } else {
      this.domService.removeElement('iframe');
    }
  }

  private initWindowListeners(): void {
    window.onmessage = (event) => {
      if (event.data === this.closeIframeTwinerySentEvent) {
        this.toggleIFrame(false);
      }
    };
  }
}
