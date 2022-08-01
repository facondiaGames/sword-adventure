import { IonButton } from '@ionic/react';
import { uiConfig } from '../services/DOMService';
import { Game } from '../Game';

export default function MainMenu() {
  const id = uiConfig.mainMenu;
  return (
    <div className="full-size white-background" id={id}>
      <div className="margin--auto width--60 full-height">
        <div className="flex--vertical flex--justify-center flex-align-items--center">
          <p>Sword Adventure</p>
          <IonButton
            onClick={() => {
              const game = Game.getInstance();
              game.goTo('playLevel');
            }}
            color="primary"
          >
            Play
          </IonButton>
          <IonButton
            onClick={() => {
              alert('sound settings, to be implemented');
            }}
            color="primary"
          >
            Settings
          </IonButton>
        </div>
      </div>
    </div>
  );
}
