import './index.css';
import 'reflect-metadata';
import { Game } from "./Game";
import { Container } from "typedi";
import { DOMService } from "./services/DOMService";
import { DevelService } from './DevelService';

const domService: DOMService = Container.get(DOMService);

const devService: DevelService = Container.get(DevelService);
devService.showDevelopmentTools();

const game: Game = Game.getInstance();

game.startCustomLoader().then(() => {
    domService.removeElement('loader-progress');
    game.goTo('playLevel');
});


