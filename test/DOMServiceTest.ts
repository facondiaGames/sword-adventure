import Container from 'typedi';
import {
  anything, reset, spy, verify,
} from 'ts-mockito';
import { IFrameService } from '../src/services/IFrameService';
import { DomElementIds, DOMService, HTMLElementConfig } from '../src/services/DOMService';

describe('DOMService', () => {
  let domService: DOMService;

  beforeEach(() => {
    domService = Container.get(DOMService);
  });

  describe('elementExist', () => {
    it('return false if element with given id does not exist in DOM', () => {
      const actual = domService.elementExist('test1');

      expect(actual).toBeFalse();
    });

    it('return true if element with given id exist in DOM', () => {
      const testDiv = document.createElement('div');
      testDiv.id = 'test2';
      document.body.appendChild(testDiv);

      const actual = domService.elementExist('test2');

      expect(actual).toBeTrue();
      testDiv.remove();
    });
  });

  describe('getElement', () => {
    it('return undefined if element with given id does not exist in DOM', () => {
      const actual = domService.getElement('test3' as DomElementIds);

      expect(actual).toBeUndefined();
    });

    it('return true if element with given id exist in DOM', () => {
      const testElement = document.createElement('div');
      testElement.id = 'test4';
      document.body.appendChild(testElement);

      const actual = domService.getElement('test4' as DomElementIds);

      expect(actual).toEqual(testElement);
      testElement.remove();
    });
  });

  describe('removeElement', () => {
    it('remove element if it exists in DOM', () => {
      const testElement = document.createElement('div');
      testElement.id = 'test5';
      document.body.appendChild(testElement);

      domService.removeElement('test5' as DomElementIds);

      const element = document.getElementById('test5');
      expect(element).toBeNull();
    });
  });

  describe('toggleElementVisibility', () => {
    it('should hide element if it exists in DOM', () => {
      const testElement = document.createElement('div');
      testElement.id = 'test6';
      document.body.appendChild(testElement);

      domService.toggleElementVisibility('test6' as DomElementIds, false);

      const element = document.getElementById('test6');
      expect(element?.style.visibility).toBe('hidden');
      testElement.remove();
    });

    it('should show element if it exists in DOM', () => {
      const testElement = document.createElement('div');
      testElement.id = 'test7';
      document.body.appendChild(testElement);

      domService.toggleElementVisibility('test7' as DomElementIds, true);

      const element = document.getElementById('test7');
      expect(element?.style.visibility).toBe('visible');
      testElement.remove();
    });
  });

  describe('createHTMLElement', () => {
    it('should create element with given config and append it to given element', () => {
      const parentContainer = document.createElement('div');
      document.body.appendChild(parentContainer);
      const config:HTMLElementConfig = {
        id: 'createTest' as DomElementIds,
        tagName: 'iframe',
        attributes: [{ name: 'src', value: '/test' }],
        classes: ['fake-test-class'],
        parentContainer,
      };

      domService.createHTMLElement(config);

      const element = document.getElementById('createTest');
      expect(element?.id).toBe(config.id);
      expect(element?.tagName).toBe('IFRAME');
      expect(element?.classList.contains('fake-test-class')).toBeTrue();
      expect(element?.classList.length).toBe(1);
      expect(element?.getAttribute('src')).toBe('/test');
      expect(element?.parentElement).toBe(parentContainer);
      parentContainer.remove();
    });

    it('should create element with given config and append it document body', () => {
      const config:HTMLElementConfig = {
        id: 'createTest' as DomElementIds,
        tagName: 'iframe',
        attributes: [{ name: 'src', value: '/test' }],
        classes: ['fake-test-class'],
      };

      domService.createHTMLElement(config);

      const element = document.getElementById('createTest');
      expect(element?.id).toBe(config.id);
      expect(element?.tagName).toBe('IFRAME');
      expect(element?.classList.contains('fake-test-class')).toBeTrue();
      expect(element?.classList.length).toBe(1);
      expect(element?.getAttribute('src')).toBe('/test');
      expect(element?.parentElement).toEqual(document.body);
      element?.remove();
    });
  });
});
