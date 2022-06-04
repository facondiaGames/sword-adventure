import { ActorType } from './BasicTypes';
import { Animation, Graphic, ImageSource } from 'excalibur';

export type ActorGraphic = {
    [key in ActorType]: GraphicConfig[]
}

export type SpriteConfig = {
    sheet: ImageSource
} & {
    [key in GraphicName]: ImageSource
}

export type ActorAnimation = { [key in AnimationName]: Animation };

export type GraphicConfig = { name: GraphicName, graphic: Graphic };
export type AnimationName = 'idle' | 'run';
export type GraphicName = 'hurt';

export type ActorAnimations = {
    [key in ActorType]: AnimationConfig[]
}

export type AnimationConfig = { name: AnimationName, animation: Animation };
