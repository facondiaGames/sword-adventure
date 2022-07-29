import Container, { Service } from 'typedi';
import { DOMService } from './DOMService';

@Service()
export class ModalService {
  private domService = Container.get(DOMService);

  public showEndOfLevelModal(score:number) {
    this.domService.toggleElementVisibility('modal-container', true);
    const coinScoreDiv = this.domService.getElement('coins-score');
    coinScoreDiv.innerText = score.toString();
  }
}
