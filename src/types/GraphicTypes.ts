import { ActorType, ParallaxType } from './BasicTypes';
import { Animation, Graphic, ImageSource } from 'excalibur';

export type ActorGraphic = {
    [key in ActorType]: ActorGraphicConfig[]
}

export type ParallaxGraphic = {
    [key in ParallaxType]: ParallaxGraphicConfig[]
}

export type ActorSpriteConfig = {
    sheet: ImageSource
} & {
    [key in ActorGraphicName]: ImageSource
}

export type ParallaxSpriteConfig = {
    [key in ParallaxGraphicName]: ImageSource
}

export type ActorAnimation = { [key in ActorAnimationName]: Animation };

export type ActorGraphicConfig = { name: ActorGraphicName, graphic: Graphic };
export type ParallaxGraphicConfig = { name: ParallaxGraphicName, graphic: Graphic };
export type ActorAnimationName = 'idle' | 'run';
export type ActorGraphicName = 'hurt';
export type ParallaxGraphicName = 'castle' | 'tree' | 'treeLong' | 'bush' | 'orangeBush' | 'stoneGrass' | 'empty';

export type ActorAnimations = {
    [key in ActorType]: ActorAnimationConfig[]
}

export type ActorAnimationConfig = { name: ActorAnimationName, animation: Animation };

export type TileSize = { width: number, height: number };
