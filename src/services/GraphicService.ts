import { Service } from 'typedi';
import { Actor } from 'excalibur';
import { AllGraphics, } from '../config/graphics/AllGraphics';
import { ActorType } from '../types/BasicTypes';
import { AnimationConfig, GraphicConfig } from '../types/GraphicTypes';

@Service()
export class GraphicService {

    public registerActorAnimations(actorType: ActorType, actor: Actor): void {
        const animationElement: AnimationConfig[] = AllGraphics.animations?.[actorType];
        animationElement?.forEach(({name, animation}) => {
            actor.graphics.add(name, animation);
        });
    }

    public registerActorGraphics(actorType: ActorType, actor: Actor): void {
        const graphicInfo: GraphicConfig[] = AllGraphics.textures?.[actorType];
        graphicInfo?.forEach(({graphic, name}) => {
            actor.graphics.add(name, graphic);
        });
    }

}

