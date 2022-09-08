import { IonButton, IonIcon } from '@ionic/react';
import { Container } from 'typedi';
import { LanguageService } from '../services/LanguageService';
import { Translation } from '../config/Translation';
import { useEffect, useState } from 'react';
import { Game } from '../Game';
import { gameController } from 'ionicons/icons';

export default function PlayButton() {
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
    <div>
    <IonButton
      onClick={() => {
        const game = Game.getInstance();
        game.goTo({toScene:'playLevel'});
      }}
      color="primary"
      size="large"
    >
      <IonIcon slot="start" icon={gameController} />
      {playText}
    </IonButton>
  </div>
  );
}
