import { IonButton, IonText } from '@ionic/react';
import Container from 'typedi';
import { useEffect, useState } from 'react';
import { uiConfig } from '../services/DOMService';
import { Game } from '../Game';
import SoundSettings from './SoundSettings';
import LanguageService from '../services/LanguageService';
import { Translation } from '../config/Translation';
import LanguageSettings from './LanguageSettings';

export default function MainMenu() {
  const id = uiConfig.mainMenu;
  const languageService = Container.get(LanguageService);
  const [playText, setPlayText] = useState(languageService.translate(Translation.keys.play));

  useEffect(() => {
    const sub = languageService.onLanguageChange().subscribe(() => {
      setPlayText(languageService.translate(Translation.keys.play));
    });
    return () => {
      sub.unsubscribe();
    };
  });

  return (
    <div style={{ flexGrow: 1 }} id={id}>
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
            size="large"
          >
            {playText}
          </IonButton>
        </div>

        <SoundSettings />
        <LanguageSettings />

      </div>
    </div>
  );
}
