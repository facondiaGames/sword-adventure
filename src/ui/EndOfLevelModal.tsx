import { IonButton, IonText } from '@ionic/react';
import { uiConfig } from '../services/DOMService';
import { Game } from '../Game';

export default function EndOfLevelModal({ score }: { score:number }) {
  const id = uiConfig.endOfLevelModal;
  return (
    <div className="full-size gradient-background" id={id}>
      <div className="margin--auto width--60 full-height">
        <div className="flex--vertical flex--space-evenly flex-align-items--center">
          <IonText>
            Your score is {score}
            .
          </IonText>
          <IonButton
            onClick={() => {
              const game = Game.getInstance();
              game.goTo('menuLevel');
            }}
            color="primary"
            size='large'
          >
            Go to main menu
          </IonButton>
        </div>
      </div>
    </div>
  );
}
