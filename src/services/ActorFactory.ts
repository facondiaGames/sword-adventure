import { Service } from 'typedi';
import { Player } from '../actors/Player';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { ActorTags } from '../config/ActorTags';
import { ActorConfig } from '../actors/ExcaliburActor';

@Service()
export class ActorFactory {

    public createPlayer(actorArgs: ActorArgs): Player {
        const {TAGS, COLLISION_GROUPS} = ActorTags;
        const actorConfig: ActorConfig = {tag: TAGS.player, collisionGroupKey: COLLISION_GROUPS.player};
        return new Player(actorArgs, actorConfig);
    }

}
