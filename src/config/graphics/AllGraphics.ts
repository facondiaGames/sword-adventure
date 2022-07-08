import { ImageSource, Sprite } from 'excalibur';
import { PlayerGraphics } from './PlayerGraphics';
import { ActorAnimations, ActorGraphic, ParallaxGraphic } from '../../types/GraphicTypes';
import { ParallaxGraphics } from './ParallaxGraphics';
import { ParallaxTexturesKeys } from './keys/ParallaxTextureKeys';
import { ActorAnimationsKeys } from './keys/ActorTextureKeys';

export module AllGraphics {

    export const animations: ActorAnimations = {
        player: [
            {name: ActorAnimationsKeys.IDLE, animation: PlayerGraphics.animations.idle},
            {name: ActorAnimationsKeys.RUN, animation: PlayerGraphics.animations.run},
        ]
    }

    export const actorTextures: ActorGraphic = {
        player: [
            {name: ActorAnimationsKeys.HURT, graphic: toSprite(PlayerGraphics.sprites.hurt)},
        ]
    }

    export const parallaxGraphic: ParallaxGraphic = {
        layer1: [
            {name: ParallaxTexturesKeys.CASTLE, graphic: toSprite(ParallaxGraphics.sprites.castle)}
        ],
        layer2: [
            {name: ParallaxTexturesKeys.TREE, graphic: toSprite(ParallaxGraphics.sprites.tree)},
            {name: ParallaxTexturesKeys.TREE_LONG, graphic: toSprite(ParallaxGraphics.sprites.treeLong)},
            {name: ParallaxTexturesKeys.EMPTY, graphic: toSprite(ParallaxGraphics.sprites.empty)},
        ],
        layer3: [
            {name: ParallaxTexturesKeys.BUSH, graphic: toSprite(ParallaxGraphics.sprites.bush)},
            {name: ParallaxTexturesKeys.ORANGE_BUSH, graphic: toSprite(ParallaxGraphics.sprites.orangeBush)},
            {name: ParallaxTexturesKeys.EMPTY, graphic: toSprite(ParallaxGraphics.sprites.empty)},
        ],
        layer4: [
            {name: ParallaxTexturesKeys.STONE_GRASS, graphic: toSprite(ParallaxGraphics.sprites.stoneGrass)}
        ]
    }

    function toSprite(imageSource: ImageSource): Sprite {
        return imageSource.toSprite();
    }

}
