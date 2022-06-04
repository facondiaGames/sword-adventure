import { ImageSource, Sprite } from 'excalibur';
import { PlayerGraphics } from './PlayerGraphics';
import { ActorAnimations, ActorGraphic } from '../../types/GraphicTypes';

export module AllGraphics {

    export const animations: ActorAnimations = {
        player: [
            {name: 'idle', animation: PlayerGraphics.animations.idle},
            {name: 'run', animation: PlayerGraphics.animations.run},
        ]
    }

    export const textures: ActorGraphic = {
        player: [
            {graphic: toSprite(PlayerGraphics.sprites.hurt), name: 'hurt'},
        ]
    }

    function toSprite(imageSource: ImageSource): Sprite {
        return imageSource.toSprite();
    }

}
