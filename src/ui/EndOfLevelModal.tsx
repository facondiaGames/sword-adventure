import { IonButton, IonText } from '@ionic/react';
import Container from 'typedi';
import { uiConfig } from '../services/DOMService';
import { Game } from '../Game';
import { Translation } from '../config/Translation';
import { LanguageService } from '../services/LanguageService';
import { MotionService } from '../services/MotionService';

export default function EndOfLevelModal({ score }: { score:number }) {
  const id = uiConfig.endOfLevelModal;
  const languageService = Container.get(LanguageService);
  const goToMenuText = languageService.translate(Translation.keys.goToMainMenu);
  const endOfLevelText = languageService.translate(Translation.keys.yourScore);
  const motionService = Container.get(MotionService);
  motionService.unsetPlayer();

  return (
    <div className="full-size gradient-background" id={id}>
      <div className="margin--auto width--60 full-height">
        <div className="flex--vertical flex--space-evenly flex-align-items--center">
          <IonText>
            {endOfLevelText}
            {' '}
            {score}
            .
          </IonText>
          <IonButton
            onClick={() => {
              const game = Game.getInstance();
              game.goTo({toScene:'menuLevel'});
            }}
            color="primary"
            size="large"
          >
            {goToMenuText}
          </IonButton>
        </div>
      </div>
    </div>
  );
}
