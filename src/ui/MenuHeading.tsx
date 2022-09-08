import { IonText } from '@ionic/react';
import { Container } from 'typedi';
import { LanguageService } from '../services/LanguageService';
import { Translation } from '../config/Translation';
import { useEffect, useState } from 'react';
import { Links } from '../config/Links';

export default function MenuHeading() {
  
  const languageService = Container.get(LanguageService);
  const [menuHeadingText, setMenuHeadingText] = useState(languageService.translate(Translation.keys.menuHeading));
  const [menuSubHeadingText, setMenuSubHeadingText] = useState(languageService.translate(Translation.keys.menuSubHeading));
  const {facondiaGitHub, facondiaWebSite} = Links.keys;
  const {facondiaGames, gitHub} = Translation.immutable;

  useEffect(() => {
    const sub = languageService.onLanguageChange().subscribe(() => {
      setMenuHeadingText(languageService.translate(Translation.keys.menuHeading));
      setMenuSubHeadingText(languageService.translate(Translation.keys.menuSubHeading));
    });
    return () => {
      sub.unsubscribe();
    };
  });

  return (     
    <div className=' text-centered'>
      <IonText>Sword Adventure</IonText>
      <p className="font-xlarge">
        <IonText>{menuHeadingText} <a href={facondiaWebSite} target="_blank">{facondiaGames}</a>. {menuSubHeadingText} <a href={facondiaGitHub} target="_blank">{gitHub}</a>!        
        </IonText></p> 
    </div>
  );
}
