import './index.css';
import 'reflect-metadata';
import { Container } from 'typedi';
import { Game } from './Game';
import { DOMService } from './services/DOMService';
import { DevelService } from './DevelService';
import { DeviceService } from './services/DeviceService';

const domService: DOMService = Container.get(DOMService);
const deviceService: DeviceService = Container.get(DeviceService);
deviceService.init();

const devService: DevelService = Container.get(DevelService);
devService.showDevelopmentTools();

const game: Game = Game.getInstance();

game.startCustomLoader().then(() => {
  domService.removeElement('loader-progress');
  game.goTo('playLevel');
});
