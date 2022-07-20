import Container from 'typedi';
import {
  anything, reset, spy, verify,
} from 'ts-mockito';
import { IFrameService } from '../src/services/IFrameService';
import { DOMService } from '../src/services/DOMService';

describe('IFrameService', () => {
  let iFrameService: IFrameService;
  let domServiceSpy: DOMService;

  beforeEach(() => {
    iFrameService = new IFrameService();
    domServiceSpy = spy(Container.get(DOMService));
  });

  afterEach(() => {
    reset(domServiceSpy);
  });

  describe('init', () => {
    it('should retrieve iframe container element from DOM', () => {
      iFrameService.init();

      verify(domServiceSpy.getElement('iframe-container')).once();
    });

    // TODO: how to wait for event to be received before running assertions?
    // it('should init window listeners', async () => {
    //     const testIFrame = createTestIFrame();

    //     iFrameService.init();

    //     const event = new Event('build');
    //     testIFrame.dispatchEvent(event);

    //     /* The verify(...) is called before the listener handler function of window declared in IFrameService.init(),
    //     * as you can see in debug.
    //     * I've found a possible solution here: https://stackoverflow.com/questions/71912032/window-dispatchevent-from-test-code-does-not-trigger-window-addeventlistener
    //     * and I've adapted it as follows, but still the test fails randomly.
    //     */
    //     flushMessageQueue().then(() => {
    //         verify(domServiceSpy.toggleElementVisibility('iframe-container', false)).once();
    //     });

    // function flushMessageQueue(ms = 1000) {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    // function createTestIFrame(){
    //     const testIFrame = document.createElement('iframe');
    //     testIFrame.addEventListener('build', () => {
    //     window.top?.postMessage('CLOSE_IFRAME') });
    //     return testIFrame;
    // }
  });

  describe('toggleIFrame', () => {
    it('should create and show the iframe, show the iframe container and hide the joystick', () => {
      iFrameService.toggleIFrame(true);

      verify(domServiceSpy.toggleElementVisibility('iframe-container', true)).once();
      verify(domServiceSpy.toggleElementVisibility('joystick', false)).once();
      verify(domServiceSpy.createHTMLElement(anything())).once();
    });

    it('should remove the iframe and hide its container, show the joystick', () => {
      iFrameService.toggleIFrame(false);

      verify(domServiceSpy.toggleElementVisibility('iframe-container', false)).once();
      verify(domServiceSpy.toggleElementVisibility('joystick', true)).once();
      verify(domServiceSpy.removeElement('iframe')).once();
    });
  });
});
