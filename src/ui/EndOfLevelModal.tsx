import { IonButton } from '@ionic/react';
import { uiConfig } from '../services/DOMService';
import { Game } from '../Game';

export default function EndOfLevelModal({ score }: { score:number }) {
  const id = uiConfig.endOfLevelModal;
  return (
    <div className="full-size" id={id}>
      <div className="margin--auto width--60 full-height">
        <div className="flex--vertical flex--justify-center flex-align-items--center">
          <p>
            Your score is
            {score}
            .
          </p>
          <IonButton
            onClick={() => {
              const game = Game.getInstance();
              game.goTo('menuLevel');
            }}
            color="primary"
          >
            Go to main menu
          </IonButton>
        </div>
      </div>
    </div>
  );
}
