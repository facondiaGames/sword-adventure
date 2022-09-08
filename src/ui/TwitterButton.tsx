import { IonIcon, IonButton } from '@ionic/react';
import { Links } from '../config/Links';
import {  logoTwitter } from 'ionicons/icons';
import { RouterService } from '../services/RouterService';
import Container from 'typedi';


export default function TwitterButton() {

  return (
    <IonButton id="twitter-button" shape="round" size='large' color='tertiary'
    onClick={() => {
      const router = Container.get(RouterService);
      const {facondiaTwitter} = Links.keys;
      router.openLink(facondiaTwitter);
    }}>
    <IonIcon slot="icon-only" icon={logoTwitter} />
  </IonButton>
  );
}

