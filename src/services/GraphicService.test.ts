import { mock, spy, when } from 'ts-mockito';
import {
  Actor, Animation, Graphic, GraphicsComponent,
} from 'excalibur';
import { GraphicService } from './GraphicService';
import { AllGraphics } from '../config/graphics/AllGraphics';
import { ActorAnimations, ActorGraphic, ParallaxGraphic } from '../types/GraphicTypes';

describe('GraphicService', () => {
  let graphicService: GraphicService;
  let allGraphics: typeof AllGraphics;

  beforeEach(() => {
    graphicService = new GraphicService();
    allGraphics = spy(AllGraphics);
  });

  it('registerActorGraphics', () => {
    const actor: Actor = new Actor();
    const expected: Graphic = mock(Graphic);
    const actorGraphic: ActorGraphic = { player: [{ graphic: expected, name: 'hurt' }] } as ActorGraphic;
    when(allGraphics.actorTextures).thenReturn(actorGraphic);

    graphicService.registerActorGraphics('player', actor);

    const graphicsComponent: GraphicsComponent = actor.graphics;
    const actual: Graphic = graphicsComponent.getGraphic('hurt');
    expect(actual).toEqual(expected);
  });

  it('registerActorAnimations', () => {
    const actor: Actor = new Actor();
    const expected: Animation = mock(Animation);
    const actorAnimations: ActorAnimations = { player: [{ animation: expected, name: 'run' }] } as ActorAnimations;
    when(allGraphics.animations).thenReturn(actorAnimations);

    graphicService.registerActorAnimations('player', actor);

    const graphicsComponent: GraphicsComponent = actor.graphics;
    expect(Array.from(Object.keys(graphicsComponent.graphics)).length).toBe(1);
    const actual: Graphic = graphicsComponent.getGraphic('run');
    expect(actual).toEqual(expected);
  });

  it('registerParallaxGraphics', () => {
    const actor: Actor = new Actor();
    const expected: Graphic = mock(Graphic);
    const parallaxGraphic: ParallaxGraphic = { layer1: [{ graphic: expected, name: 'castle' }] } as ParallaxGraphic;
    when(allGraphics.parallaxGraphic).thenReturn(parallaxGraphic);

    graphicService.registerParallaxGraphics('layer1', actor);

    const graphicsComponent: GraphicsComponent = actor.graphics;
    const actual: Graphic = graphicsComponent.getGraphic('castle');
    expect(actual).toEqual(expected);
  });
});
