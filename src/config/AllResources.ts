import { ImageSource } from 'excalibur';
import { PlayerGraphics } from './graphics/PlayerGraphics';
import { ParallaxGraphics } from './graphics/ParallaxGraphics';

const playerImages: ImageSource[] = Object.values(PlayerGraphics.sprites);
const parallaxImages: ImageSource[] = Object.values(ParallaxGraphics.sprites);

export const allResources: ImageSource[] = [
    ...playerImages,
    ...parallaxImages
]
