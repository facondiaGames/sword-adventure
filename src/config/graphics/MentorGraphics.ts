import { ImageSource } from 'excalibur';
import { ActorSpriteConfig } from '../../types/GraphicTypes';
import mentorIdleSource from '../../assets/platformer-art-complete-pack-0/mentor/p3_front.png';
import mentorHelloSource from '../../assets/platformer-art-complete-pack-0/mentor/p3_stand.png';

export module MentorGraphics {

    const mentorIdle = new ImageSource(mentorIdleSource);
    const mentorHello = new ImageSource(mentorHelloSource);

    export const sprites: Partial<ActorSpriteConfig> = {
      idle: mentorIdle,
      hello: mentorHello,
    };

}
