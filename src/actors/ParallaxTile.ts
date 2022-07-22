import { Actor, Engine } from 'excalibur';
import { Container } from 'typedi';
import { GraphicService } from '../services/GraphicService';
import { ParallaxType } from '../types/BasicTypes';
import { ParallaxGraphicConfig, TileSize } from '../types/GraphicTypes';
import { AllGraphics } from '../config/graphics/AllGraphics';

export class ParallaxTile extends Actor {
  private graphicService: GraphicService = Container.get(GraphicService);

  constructor(private parallaxType: ParallaxType, private tileSize: TileSize) {
    super();
  }

  public getTileSize(): TileSize {
    return this.tileSize;
  }

  public onInitialize(_engine: Engine) {
    super.onInitialize(_engine);
    this.graphicService.registerParallaxGraphics(this.parallaxType, this);
    const { graphic, name } = this.getRandomGraphic();
    graphic.height = this.tileSize.height;
    graphic.width = this.tileSize.width;
    this.graphics.use(name);
  }

  private getRandomGraphic(): ParallaxGraphicConfig {
    const items = AllGraphics.parallaxGraphic[this.parallaxType];
    return items[Math.floor(Math.random() * items.length)];
  }
}
