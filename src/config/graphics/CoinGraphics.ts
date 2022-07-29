import { ImageSource } from 'excalibur';
import { ActorSpriteConfig } from '../../types/GraphicTypes';
import idleSource from '../../assets/voxel-pack/PNG/Items/ore_gold.png';

export module CoinGraphics {

    const idle = new ImageSource(idleSource);

    export const sprites: Partial<ActorSpriteConfig> = {
      idle
    };

}
