import { IonIcon, IonButton } from '@ionic/react';
import { Links } from '../config/Links';
import { logoInstagram } from 'ionicons/icons';
import { RouterService } from '../services/RouterService';
import Container from 'typedi';


export default function InstagramButton() {

  return (
      <IonButton id="instagram-button" shape="round" size='large' color='tertiary'
      onClick={() => {
        const router = Container.get(RouterService);
        const {facondiaInstagram} = Links.keys;
        router.openLink(facondiaInstagram);
      }}
      >
      <IonIcon slot="icon-only" icon={logoInstagram} />
    </IonButton>
  );
}

