import { IonButton, IonText } from '@ionic/react';
import { uiConfig } from '../services/DOMService';
import { Game } from '../Game';
import SoundSettings from './SoundSettings';

export default function MainMenu() {
  const id = uiConfig.mainMenu;
  return (
    <div style={{flexGrow:1}} id={id}>
        <div className="flex--vertical flex--space-between flex-align-items--center">
          <div>
            <IonText>Sword Adventure</IonText>
          </div>
          <div>
            <IonButton
              onClick={() => {
                const game = Game.getInstance();
                game.goTo('playLevel');
              }}
              color="primary"
              size='large'
              >
              Play
            </IonButton>
          </div>
         
         <SoundSettings></SoundSettings>

        </div>
      </div>
  );
}
