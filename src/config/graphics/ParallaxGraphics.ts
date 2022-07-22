import { ImageSource } from 'excalibur';
import stoneImage from '../../assets/voxel-pack/PNG/Tiles/stone_grass.png';
import bushImage from '../../assets/background-elements-redux-fix/PNG/Retina/bush1.png';
import bushOrangeImage from '../../assets/background-elements-redux-fix/PNG/Retina/bushOrange1.png';
import treeImage from '../../assets/background-elements-redux-fix/PNG/Retina/tree.png';
import emptyImage from '../../assets/empty.png';
import treeLongImage from '../../assets/background-elements-redux-fix/PNG/Retina/treeLong.png';
import castleBackgroundImage from '../../assets/background-elements-redux-fix/Backgrounds/backgroundCastles.png';
import { ParallaxSpriteConfig } from '../../types/GraphicTypes';

export module ParallaxGraphics {

    const castles = new ImageSource(castleBackgroundImage);
    const tree = new ImageSource(treeImage);
    const treeLong = new ImageSource(treeLongImage);
    const bush = new ImageSource(bushImage);
    const orangeBush = new ImageSource(bushOrangeImage);
    const stoneGrass = new ImageSource(stoneImage);
    const empty = new ImageSource(emptyImage);

    export const sprites: ParallaxSpriteConfig = {
      castle: castles,
      orangeBush,
      bush,
      tree,
      treeLong,
      stoneGrass,
      empty,
    };

}
