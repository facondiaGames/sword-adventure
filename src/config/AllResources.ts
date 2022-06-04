import { ImageSource } from 'excalibur';
import { PlayerGraphics } from './graphics/PlayerGraphics';

const playerImages: ImageSource[] = Object.values(PlayerGraphics.sprites);

export const allResources: ImageSource[] = [
    ...playerImages
]
