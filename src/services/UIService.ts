import Container, { Service } from 'typedi';
import ReactDOM from 'react-dom';
import React from 'react';
import { DOMService } from './DOMService';
import EndOfLevelModal from '../ui/EndOfLevelModal';
import IonicReactUI from '../ui/IonicReactUI';

@Service()
export class UIService {
  private domService = Container.get(DOMService);

  public showEndOfLevelModal(score:number) {
    const container: HTMLElement = this.domService.getElement('modal-container');
    ReactDOM.render(React.createElement(EndOfLevelModal, { score }), container);
    this.domService.toggleElementVisibility('modal-container', true);
  }

  public showMainMenu() {
    const root: HTMLElement = this.domService.getElement('menu');
    ReactDOM.render(React.createElement(IonicReactUI), root);
    this.domService.toggleElementVisibility('menu', true);
    this.domService.toggleElementVisibility('modal-container', false);
  }
}
