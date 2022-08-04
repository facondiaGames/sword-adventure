import {  IonText } from '@ionic/react';
import { uiConfig } from '../services/DOMService';
import Container from 'typedi';
import { useEffect, useState } from 'react';
import { GameStateService } from '../services/GameStateService';
import { filter, first } from 'rxjs';
import { Util } from '../Util';
import LanguageService from '../services/LanguageService';
import { Translation } from '../config/Translation';

export default function Score() {
  const id = uiConfig.scoreDiv;

  const gameStateService = Container.get(GameStateService);
  const languageService = Container.get(LanguageService);
  const [coinsCount, setCoinsCount] = useState(undefined);

  const [coinsCountText, setCoinsCountText] = useState(languageService.translate(Translation.keys.score));

  useEffect(() => {
    const sub = languageService.onLanguageChange().subscribe(() => {
      setCoinsCountText(languageService.translate(Translation.keys.score));
    });
    return () => {
        sub.unsubscribe();
    }
});

  useEffect(() => {
    gameStateService.onCoinsCountChange()
    .pipe(
      filter(value => Util.isDefined(value)),
      first())
    .subscribe(coinsCount => {
        setCoinsCount(coinsCount)
    });



  });


  return (
    <div className="font-large flex--horizontal-no-full full-width flex--justify-end padding-s" id={id}>
      <IonText>{coinsCountText} {coinsCount}</IonText>
    </div>
  );
}
