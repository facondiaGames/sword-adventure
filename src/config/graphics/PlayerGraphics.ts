import { Animation, ImageSource, range, SpriteSheet } from 'excalibur';
import botSpriteSheet from '../../assets/robot/tilesheet/character_robot_sheet.png'
import botHurt from '../../assets/robot/png/poses/character_robot_hurt.png';
import { ActorAnimation, ActorSpriteConfig } from '../../types/GraphicTypes';

export module PlayerGraphics {

    const botSpriteSheetSource = new ImageSource(botSpriteSheet);
    const botHurtSource = new ImageSource(botHurt);

    const botSheet: SpriteSheet = SpriteSheet.fromImageSource({
        image: botSpriteSheetSource,
        grid: {
            rows: 5,
            columns: 9,
            spriteWidth: 96,
            spriteHeight: 128
        }
    });

    export const sprites: Partial<ActorSpriteConfig> = {
        sheet: botSpriteSheetSource,
        hurt: botHurtSource
    }

    export const animations: Partial<ActorAnimation> = {
        idle: Animation.fromSpriteSheet(botSheet, range(0, 0), 100),
        run: Animation.fromSpriteSheet(botSheet, range(25, 27), 100)
    }

}

