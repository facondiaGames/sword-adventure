import React from 'react';
import { IonApp } from '@ionic/react';
import MainMenu from './MainMenu';
import Score from './Score';
import { uiConfig } from '../services/DOMService';

export default function IonicReactUI() {
  const id = uiConfig.gameUI;
  return (
    <React.StrictMode>
      <IonApp>
        <div id={id} className="gradient-background flex--vertical flex--justify-center flex-align-items--center">
          <Score />
          <MainMenu />
        </div>
      </IonApp>

    </React.StrictMode>
  );
}
