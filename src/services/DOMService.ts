import { Service } from 'typedi';
import { Util } from '../Util';

@Service()
export class DOMService {

    private map: Map<string, HTMLElement> = new Map();

    public elementExist(elementId: string): boolean {
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
        element?.parentElement?.remove();
    }

}

export const uiConfig: UiDivConfig = {
    rootDivId: 'root',
    gameCanvaId: 'game',
    loaderProgressId: 'loader-progress'
};

export type DomElementIds = 'root' | 'game' | 'loader-progress';
export type DomElementKeys = 'rootDivId' | 'gameCanvaId' | 'loaderProgressId';

export type UiDivConfig = { [key in DomElementKeys]: DomElementIds }
