import { ImageSource } from 'excalibur';
import { PlayerGraphics } from './graphics/PlayerGraphics';
import { ParallaxGraphics } from './graphics/ParallaxGraphics';
import { MentorGraphics } from './graphics/MentorGraphics';

const playerImages: ImageSource[] = Object.values(PlayerGraphics.sprites);
const parallaxImages: ImageSource[] = Object.values(ParallaxGraphics.sprites);
const mentorImages: ImageSource[] = Object.values(MentorGraphics.sprites);

export const allResources: ImageSource[] = [
  ...playerImages,
  ...parallaxImages,
  ...mentorImages,
];
