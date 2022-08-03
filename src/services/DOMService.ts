import { Service } from 'typedi';
import { Util } from '../Util';

@Service()
export class DOMService {
  private map: Map<string, HTMLElement> = new Map();

  public elementExist(elementId: string | DomElementIds): boolean {
    return Util.isDefined(document.getElementById(elementId));
  }

  public getElement(elementId: DomElementIds): HTMLElement {
    if (this.map.has(elementId)) {
      return this.map.get(elementId);
    }
    if (this.elementExist(elementId)) {
      const element: HTMLElement = document.getElementById(elementId);
      this.map.set(elementId, element);
      return element;
    }
    return undefined;
  }

  public removeElement(elementId: DomElementIds): void {
    const element = this.getElement(elementId);
    element?.remove();
  }

  public toggleElementVisibility(elementId: DomElementIds, visible:boolean) {
    const exist = this.elementExist(elementId);
    if (exist) {
      const element = this.getElement(elementId);
      element.style.visibility = visible ? 'visible' : 'hidden';
    }
  }

  public createHTMLElement({
    id, tagName, classes, parentContainer, attributes,
  }: HTMLElementConfig) {
    const htmlElement = document.createElement(tagName);
    htmlElement.id = id;
    if (Util.isDefined(parentContainer)) {
      parentContainer.appendChild(htmlElement);
    } else {
      document.body.appendChild(htmlElement);
    }
    classes?.forEach((c) => htmlElement.classList.add(c));
    attributes?.forEach(({ name: attributeName, value: attributeValue }) => htmlElement.setAttribute(attributeName, attributeValue));
    this.map.set(id, htmlElement);
    return htmlElement;
  }
}

export const uiConfig: UiDivConfig = {
  menuDivId: 'menu',
  gameCanvaId: 'game',
  loaderProgressId: 'loader-progress',
  iFrameContainerDiv: 'iframe-container',
  iframe: 'iframe',
  loaderContainerDiv: 'loader-container',
  modalContainerDiv: 'modal-container',
  endOfLevelModal: 'end-of-level-modal',
  mainMenu: 'main-menu',
  soundSettings: 'sound-settings',
  scoreDiv: 'score'
};

export type DomElementIds = 'menu' | 'game' |'loader-container' |'loader-progress' | 'joystick'
| 'iframe-container' | 'iframe'
| 'modal-container'
| 'end-of-level-modal'
| 'main-menu'
| 'sound-settings'
| 'score';
export type DomElementKeys = 'menuDivId' | 'gameCanvaId' | 'loaderContainerDiv'| 'loaderProgressId'
| 'iFrameContainerDiv' | 'iframe'
| 'modalContainerDiv'
| 'endOfLevelModal'
| 'mainMenu'
| 'soundSettings'
| 'scoreDiv';

export type UiDivConfig = { [key in DomElementKeys]: DomElementIds }
export type HTMLElementConfig = {tagName:string, id:DomElementIds, classes?:string[], parentContainer?:HTMLElement, attributes?:HTMLElementAttribute[]}
export type HTMLElementAttribute = {name:string, value:string};
