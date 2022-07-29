import { Service } from 'typedi';
import { ActorArgs } from 'excalibur/build/dist/Actor';
import { Player } from '../actors/Player';
import { Tags } from '../config/Tags';
import { ActorConfig } from '../actors/ExcaliburActor';
import { Mentor } from '../actors/Mentor';
import { LevelStateModifier } from '../actors/LevelStateModifier';
import { LevelStateModifierType } from '../types/BasicTypes';

@Service()
export class ActorFactory {
  public createPlayer(actorArgs: ActorArgs): Player {
    const { ACTORS, COLLISION_GROUPS } = Tags;
    const actorConfig: ActorConfig = { tag: ACTORS.player, collisionGroupKey: COLLISION_GROUPS.player };
    return new Player(actorArgs, actorConfig);
  }

  public createMentor(actorArgs: ActorArgs): Mentor {
    const { ACTORS, COLLISION_GROUPS } = Tags;
    const actorConfig: ActorConfig = { tag: ACTORS.mentor, collisionGroupKey: COLLISION_GROUPS.mentor };
    return new Mentor(actorArgs, actorConfig);
  }

  public createLevelStateModifier(type: LevelStateModifierType,actorArgs: ActorArgs): LevelStateModifier {
    const { ACTORS, COLLISION_GROUPS } = Tags;
    const actorConfig: ActorConfig = { tag: ACTORS[type], collisionGroupKey: COLLISION_GROUPS[type] };
    return new LevelStateModifier(type,actorArgs, actorConfig);
  }

}
