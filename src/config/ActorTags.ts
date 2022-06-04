import { ActorType } from '../types/BasicTypes';

export module ActorTags {

    export const COLLISION_GROUPS: { [key in ActorType]: string } = {
        player: 'player_collision_group'
    }

    export const TAGS: { [key in ActorType]: string } = {
        player: 'player_tag'
    };

}
