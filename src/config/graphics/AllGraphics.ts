import { ImageSource, Sprite } from 'excalibur';
import { PlayerGraphics } from './PlayerGraphics';
import { ActorAnimations, ActorGraphic, ParallaxGraphic } from '../../types/GraphicTypes';
import { ParallaxGraphics } from './ParallaxGraphics';
import { ParallaxTexturesKeys } from './keys/ParallaxTextureKeys';
import { ActorAnimationsKeys } from './keys/ActorTextureKeys';
import { MentorGraphics } from './MentorGraphics';
import { CoinGraphics } from './CoinGraphics';
import { SwordGraphics } from './SwordGraphics';

export module AllGraphics {

    export const animations: Partial<ActorAnimations> = {
      player: [
        { name: ActorAnimationsKeys.IDLE, animation: PlayerGraphics.animations.idle },
        { name: ActorAnimationsKeys.RUN, animation: PlayerGraphics.animations.run },
      ],
    };

    export const actorTextures: Partial<ActorGraphic> = {
      player: [
        { name: ActorAnimationsKeys.HURT, graphic: toSprite(PlayerGraphics.sprites.hurt) },
      ],
      mentor: [
        { name: ActorAnimationsKeys.IDLE, graphic: toSprite(MentorGraphics.sprites.idle) },
        { name: ActorAnimationsKeys.HELLO, graphic: toSprite(MentorGraphics.sprites.hello) },
      ],
      coin: [
        { name: ActorAnimationsKeys.IDLE, graphic: toSprite(CoinGraphics.sprites.idle) },
      ],
      sword: [
        { name: ActorAnimationsKeys.IDLE, graphic: toSprite(SwordGraphics.sprites.idle) },
      ],

    };

    export const parallaxGraphic: ParallaxGraphic = {
      layer1: [
        { name: ParallaxTexturesKeys.CASTLE, graphic: toSprite(ParallaxGraphics.sprites.castle) },
      ],
      layer2: [
        { name: ParallaxTexturesKeys.TREE, graphic: toSprite(ParallaxGraphics.sprites.tree) },
        { name: ParallaxTexturesKeys.TREE_LONG, graphic: toSprite(ParallaxGraphics.sprites.treeLong) },
        { name: ParallaxTexturesKeys.EMPTY, graphic: toSprite(ParallaxGraphics.sprites.empty) },
      ],
      layer3: [
        { name: ParallaxTexturesKeys.BUSH, graphic: toSprite(ParallaxGraphics.sprites.bush) },
        { name: ParallaxTexturesKeys.ORANGE_BUSH, graphic: toSprite(ParallaxGraphics.sprites.orangeBush) },
        { name: ParallaxTexturesKeys.EMPTY, graphic: toSprite(ParallaxGraphics.sprites.empty) },
      ],
      layer4: [
        { name: ParallaxTexturesKeys.STONE_GRASS, graphic: toSprite(ParallaxGraphics.sprites.stoneGrass) },
      ],
    };

    function toSprite(imageSource: ImageSource): Sprite {
      return imageSource.toSprite();
    }

}
