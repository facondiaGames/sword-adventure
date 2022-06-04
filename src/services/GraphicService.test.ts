import { GraphicService } from './GraphicService';
import { mock, spy, when } from 'ts-mockito';
import { Actor, Animation, Graphic, GraphicsComponent } from 'excalibur';
import { AllGraphics } from '../config/graphics/AllGraphics';
import { ActorAnimations, ActorGraphic } from '../types/GraphicTypes';

describe('GraphicService', () => {

    let graphicService: GraphicService;
    let allGraphics: typeof AllGraphics;

    beforeEach(() => {
        graphicService = new GraphicService();
        allGraphics = spy(AllGraphics);
    });

    it('should register actor graphics', () => {
        const actor: Actor = new Actor();
        const expected: Graphic = mock(Graphic);
        const actorGraphic: ActorGraphic = {player: [{graphic: expected, name: 'hurt'}]};
        when(allGraphics.textures).thenReturn(actorGraphic)

        graphicService.registerActorGraphics('player', actor);

        const graphicsComponent: GraphicsComponent = actor.graphics;
        const actual: Graphic = graphicsComponent.getGraphic('hurt');
        expect(actual).toEqual(expected);
    });

    it('should register actor animations', () => {
        const actor: Actor = new Actor();
        const expected: Animation = mock(Animation);
        const actorAnimations: ActorAnimations = {player: [{animation: expected, name: 'run'}]};
        when(allGraphics.animations).thenReturn(actorAnimations)

        graphicService.registerActorAnimations('player', actor);

        const graphicsComponent: GraphicsComponent = actor.graphics;
        expect(Array.from(Object.keys(graphicsComponent.graphics)).length).toBe(1);
        const actual: Graphic = graphicsComponent.getGraphic('run');
        expect(actual).toEqual(expected);
    });

});
