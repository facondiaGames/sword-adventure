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
import { StoreService } from './db-plugin/data-storage-sqlite/StoreService';
import { AudioManager } from './services/AudioManager';
import { GameStateService } from './services/GameStateService';
import LanguageService from './services/LanguageService';

setupIonicReact();

// Load font before game start. Thanks to https://excaliburjs.com/docs/text#gatsby-focus-wrapper!
await waitForFontLoad('12px MouseMemoirs-Regular');

const domService: DOMService = Container.get(DOMService);
const deviceService: DeviceService = Container.get(DeviceService);
deviceService.init();

const devService: DevelService = Container.get(DevelService);
devService.showDevelopmentTools();

const iFrameService = Container.get(IFrameService);
iFrameService.init();

const audioManager = Container.get(AudioManager);
const gameStateService = Container.get(GameStateService);
const languageService = Container.get(LanguageService);

const storeService = Container.get(StoreService);
await storeService.init().then(async () => {
  await languageService.init();
  audioManager.init();
  gameStateService.init();
  const game = Game.getInstance();
  game.startCustomLoader().then(() => {
    audioManager.startBackgroundMusic();
    domService.removeElement('loader-container');
    game.goTo('menuLevel');
  });
});


async function waitForFontLoad(font, timeout = 2000, interval = 100) {
  return new Promise((resolve, reject) => {
      // repeatedly poll check
      const poller = setInterval(async () => {
          try {
              await document.fonts.load(font);
          } catch (err) {
              reject(err);
          }
          if (document.fonts.check(font)) {
              clearInterval(poller);
              resolve(true);
          }
      }, interval);
      setTimeout(() => clearInterval(poller), timeout);
  });
}
