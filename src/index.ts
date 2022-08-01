import './index.css';
import 'reflect-metadata';
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { Container } from 'typedi';
import { setupIonicReact } from '@ionic/react';
import { Game } from './Game';
import { DOMService } from './services/DOMService';
import { DevelService } from './DevelService';
import { DeviceService } from './services/DeviceService';
import { IFrameService } from './services/IFrameService';

setupIonicReact();

const domService: DOMService = Container.get(DOMService);
const deviceService: DeviceService = Container.get(DeviceService);
deviceService.init();

const devService: DevelService = Container.get(DevelService);
devService.showDevelopmentTools();

const iFrameService = Container.get(IFrameService);
iFrameService.init();

const game: Game = Game.getInstance();

game.startCustomLoader().then(() => {
  domService.removeElement('loader-container');
  game.goTo('playLevel');
});
