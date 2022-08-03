import {  IonText } from '@ionic/react';
import { uiConfig } from '../services/DOMService';
import Container from 'typedi';
import { useEffect, useState } from 'react';
import { GameStateService } from '../services/GameStateService';
import { filter, first } from 'rxjs';
import { Util } from '../Util';

export default function Score() {
  const id = uiConfig.scoreDiv;

  const gameStateService = Container.get(GameStateService);
  const [coinsCount, setCoinsCount] = useState(undefined);
  const coinsCountText = 'Score:';

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
