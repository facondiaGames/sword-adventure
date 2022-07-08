import { ActorType, ParallaxType } from '../types/BasicTypes';

export module ZIndexes {

    export const actors: { [key in ActorType]: number } = {
        player: 100
    };

    export const layers: { [key in ParallaxType]: number } = {
        layer1: 1,
        layer2: 2,
        layer3: 3,
        layer4: 4
    }

}
