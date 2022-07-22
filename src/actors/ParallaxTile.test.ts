import { Engine } from 'excalibur';
import {
  mock, reset, spy, verify,
} from 'ts-mockito';
import { Container } from 'typedi';
import { ParallaxTile } from './ParallaxTile';
import { TileSize } from '../types/GraphicTypes';
import { GraphicService } from '../services/GraphicService';
import { ParallaxTexturesKeys } from '../config/graphics/keys/ParallaxTextureKeys';

describe('ParallaxTile', () => {
  let tile: ParallaxTile;
  let graphicServiceSpy: GraphicService;

  beforeEach(() => {
    const tileSize: TileSize = { height: 10, width: 5 };
    tile = new ParallaxTile('layer1', tileSize);
    graphicServiceSpy = spy(Container.get(GraphicService));
  });

  afterEach(() => {
    reset(graphicServiceSpy);
  });

  it('should register tile graphics when initializing it', () => {
    const engine: Engine = mock(Engine);

    tile.onInitialize(engine);

    verify(graphicServiceSpy.registerParallaxGraphics('layer1', tile)).once();
    const tileNames = tile.graphics.getNames();
    expect(tileNames.includes(ParallaxTexturesKeys.CASTLE)).toBeTruthy();
  });
});
