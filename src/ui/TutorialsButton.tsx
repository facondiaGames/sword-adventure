import { IonButton, IonIcon } from '@ionic/react';
import { Container } from 'typedi';
import { LanguageService } from '../services/LanguageService';
import { Translation } from '../config/Translation';
import { useEffect, useState } from 'react';
import { codeWorkingOutline } from 'ionicons/icons';
import { RouterService } from '../services/RouterService';
import { Links } from '../config/Links';

export default function TutorialsMenu() {
  const languageService = Container.get(LanguageService);
  const [tutorialsText, setTutorialsText] = useState(languageService.translate(Translation.keys.readTutorials));

  useEffect(() => {
    const sub = languageService.onLanguageChange().subscribe(() => {
      setTutorialsText(languageService.translate(Translation.keys.readTutorials));
    });
    return () => {
      sub.unsubscribe();
    };
  });

  return (  
      <div>
          <IonButton
            onClick={() => {
              const router = Container.get(RouterService);
              const {facondiaExcaliburTutorials} = Links.keys;
              router.openLink(facondiaExcaliburTutorials);
            }}
            color="primary"
            size="large"
          >
               <IonIcon slot="start" icon={codeWorkingOutline} />
            {tutorialsText}
          </IonButton>
      </div> 
  );
}
