import { Service } from 'typedi';
import { Actor } from 'excalibur';
import { AllGraphics, } from '../config/graphics/AllGraphics';
import { ActorType, ParallaxType } from '../types/BasicTypes';
import { ActorAnimationConfig, ActorGraphicConfig, ParallaxGraphicConfig } from '../types/GraphicTypes';

@Service()
export class GraphicService {

    public registerActorAnimations(actorType: ActorType, actor: Actor): void {
        const animationElement: ActorAnimationConfig[] = AllGraphics.animations?.[actorType];
        animationElement?.forEach(({name, animation}) => {
            actor.graphics.add(name, animation);
        });
    }

    public registerActorGraphics(actorType: ActorType, actor: Actor): void {
        const graphicInfo: ActorGraphicConfig[] = AllGraphics.actorTextures?.[actorType];
        graphicInfo?.forEach(({graphic, name}) => {
            actor.graphics.add(name, graphic);
        });
    }

    public registerParallaxGraphics(parallaxType: ParallaxType, parallaxTile: Actor): void {
        const graphicInfo: ParallaxGraphicConfig[] = AllGraphics.parallaxGraphic?.[parallaxType];
        graphicInfo?.forEach(({graphic, name}) => {
            parallaxTile.graphics.add(name, graphic);
        });
    }

}

