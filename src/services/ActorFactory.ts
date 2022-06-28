import { Service } from 'typedi';
import { Player } from '../actors/Player';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { Tags } from '../config/Tags';
import { ActorConfig } from '../actors/ExcaliburActor';

@Service()
export class ActorFactory {

    public createPlayer(actorArgs: ActorArgs): Player {
        const {ACTORS, COLLISION_GROUPS} = Tags;
        const actorConfig: ActorConfig = {tag: ACTORS.player, collisionGroupKey: COLLISION_GROUPS.player};
        return new Player(actorArgs, actorConfig);
    }

}
