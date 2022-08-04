import { Sound } from 'excalibur';
import backgroundMp3 from '../../assets/sounds/background.mp3';

export module AudioAssets {

    export const tracks = {
      backgroundMusic: new Sound(backgroundMp3),
    };

}
