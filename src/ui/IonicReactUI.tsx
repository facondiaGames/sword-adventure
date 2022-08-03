import React from 'react';
import { IonApp } from '@ionic/react';
import MainMenu from './MainMenu';
import Score from './Score';

export default function IonicReactUI() {
  return (
    <React.StrictMode>
      <IonApp>
        <div className='gradient-background flex--vertical flex--justify-center flex-align-items--center'>
          <Score></Score>
          <MainMenu />
        </div>
      </IonApp>

    </React.StrictMode>
  );
}
