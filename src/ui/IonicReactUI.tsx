import React from 'react';
import { IonApp } from '@ionic/react';
import MainMenu from './MainMenu';

export default function IonicReactUI() {
  return (
    <React.StrictMode>
      <IonApp>
        <MainMenu />
      </IonApp>

    </React.StrictMode>
  );
}
