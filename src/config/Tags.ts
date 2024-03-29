import { ActorType, ParallaxType } from '../types/BasicTypes';

export module Tags {

    export const COLLISION_GROUPS: { [key in ActorType]: string } = {
      player: 'player_collision_group',
      mentor: 'mentor_collision_group',
      coin: 'coin_collision_group',
      sword: 'sword_collision_group',
    };

    export const ACTORS: { [key in ActorType]: string } = {
      player: 'player_tag',
      mentor: 'mentor_tag',
      coin: 'coin_tag',
      sword: 'sword_tag',
    };

    export const LAYERS: { [key in 'horizontal']: { [tileKey in ParallaxType]: ParallaxType } } = {
      horizontal: {
        layer1: 'layer1',
        layer2: 'layer2',
        layer3: 'layer3',
        layer4: 'layer4',
      },
    };

}
