import { ImageSource } from 'excalibur';
import { ActorSpriteConfig } from '../../types/GraphicTypes';
import idleSource from '../../assets/voxel-pack/PNG/Items/sword_iron.png';

export module SwordGraphics {

    const idle = new ImageSource(idleSource);

    export const sprites: Partial<ActorSpriteConfig> = {
      idle,
    };
}
