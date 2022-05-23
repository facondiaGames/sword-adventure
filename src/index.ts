import './index.css';
import 'reflect-metadata';
import {Game} from "./Game";
import {Container} from "typedi";
import {DOMService} from "./services/DOMService";

const domService: DOMService = Container.get(DOMService);

const game: Game = Game.getInstance();

game.startCustomLoader().then(() => {
    domService.removeElement('loader-progress');
    game.goTo('playLevel');
});
