import { uiConfig } from '../services/DOMService';
import SoundSettings from './SoundSettings';
import PlayButton from './PlayButton';
import TutorialsButton from './TutorialsButton';

export default function MainMenu() {

  const id = uiConfig.mainMenu;

  return (
  <div id={id} className="flex--vertical flex--space-between flex-align-items--center">
    <PlayButton></PlayButton>      
    <TutorialsButton></TutorialsButton>    
    <SoundSettings />
  </div>
    );
}
