import { ImageSource } from 'excalibur';
import { PlayerGraphics } from './graphics/PlayerGraphics';
import { ParallaxGraphics } from './graphics/ParallaxGraphics';
import { MentorGraphics } from './graphics/MentorGraphics';
import { CoinGraphics } from './graphics/CoinGraphics';
import { SwordGraphics } from './graphics/SwordGraphics';

const playerImages: ImageSource[] = Object.values(PlayerGraphics.sprites);
const parallaxImages: ImageSource[] = Object.values(ParallaxGraphics.sprites);
const mentorImages: ImageSource[] = Object.values(MentorGraphics.sprites);
const coinImages: ImageSource[] = Object.values(CoinGraphics.sprites);
const swordImages: ImageSource[] = Object.values(SwordGraphics.sprites);

export const allResources: ImageSource[] = [
  ...playerImages,
  ...parallaxImages,
  ...mentorImages,
  ...coinImages,
  ...swordImages
];
