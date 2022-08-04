import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonText,
} from '@ionic/react';
import { useState } from 'react';
import { Container } from 'typedi';
import { arrowUndoCircleOutline, language } from 'ionicons/icons';
import { LanguageService, AvailableLanguages } from '../services/LanguageService';
import { Translation } from '../config/Translation';

export default function LanguageSettings(): JSX.Element {
  const languageService: LanguageService = Container.get(LanguageService);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string>(languageService.getCurrentLanguage());
  const [languageText, setLanguageText] = useState(languageService.translate(Translation.keys.language));
  const backText = languageService.translate(Translation.keys.backButton);

  return (
    <div>
      <IonButton
        onClick={() => {
          setShowModal(true);
        }}
        expand="block"
        shape="round"
        size="small"
        fill="solid"
        color="dark"
      >
        <IonIcon slot="icon-only" icon={language} />
      </IonButton>

      <IonModal isOpen={showModal}>

        <div className="gradient-background flex--vertical flex--justify-center flex-align-items--center">

          <div>
            <IonText>{languageText}</IonText>
          </div>

          <div>
            <IonCard>
              <IonCardContent>
                <div>
                  <IonRadioGroup
                    value={selected}
                    onIonChange={(e) => {
                      setSelected(e.detail.value);
                      languageService.changeLanguage(e.detail.value as AvailableLanguages).then(() => {
                        setLanguageText(languageService.translate('languageKey'));
                      });
                    }}
                  >
                    <IonItem lines="none">
                      <IonLabel>{languageService.translate('italianKey')}</IonLabel>
                      <IonRadio slot="start" value="it" />
                    </IonItem>
                    <IonItem lines="none">
                      <IonLabel>{languageService.translate('englishKey')}</IonLabel>
                      <IonRadio slot="start" value="en" />
                    </IonItem>
                  </IonRadioGroup>
                </div>
              </IonCardContent>
            </IonCard>

          </div>
          <div>
            <IonButton onClick={() => {
              setShowModal(false);
            }}
            >
              {backText}
              <IonIcon slot="end" icon={arrowUndoCircleOutline} />
            </IonButton>
          </div>

        </div>

      </IonModal>

    </div>
  );
}
