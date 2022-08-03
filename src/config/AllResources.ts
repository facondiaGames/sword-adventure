import { ImageSource, Sound } from 'excalibur';
import { PlayerGraphics } from './graphics/PlayerGraphics';
import { ParallaxGraphics } from './graphics/ParallaxGraphics';
import { MentorGraphics } from './graphics/MentorGraphics';
import { CoinGraphics } from './graphics/CoinGraphics';
import { SwordGraphics } from './graphics/SwordGraphics';
import { AudioAssets } from './audio/AudioAssets';

const playerImages: ImageSource[] = Object.values(PlayerGraphics.sprites);
const parallaxImages: ImageSource[] = Object.values(ParallaxGraphics.sprites);
const mentorImages: ImageSource[] = Object.values(MentorGraphics.sprites);
const coinImages: ImageSource[] = Object.values(CoinGraphics.sprites);
const swordImages: ImageSource[] = Object.values(SwordGraphics.sprites);
const audioAssets: Sound[] = Object.values(AudioAssets.tracks);

export const allResources: (ImageSource|Sound)[] = [
  ...playerImages,
  ...parallaxImages,
  ...mentorImages,
  ...coinImages,
  ...swordImages,
  ...audioAssets,
];
