import { Actor, ActorArgs, CollisionGroupManager, Engine } from 'excalibur';
import { ActorType } from '../types/BasicTypes';
import { Container } from 'typedi';
import { GraphicService } from '../services/GraphicService';

export abstract class ExcaliburActor extends Actor {

    abstract type: ActorType;

    private graphicService: GraphicService = Container.get(GraphicService);

    constructor({pos, color, collisionType, collider}: ActorArgs, {collisionGroupKey, tag}: ActorConfig) {
        super({
            pos,
            color,
            collisionType,
            collider,
            collisionGroup: CollisionGroupManager.create(collisionGroupKey),
        });
        this.addTag(tag);
    }

    public onInitialize(_engine: Engine) {
        this.graphicService.registerActorGraphics(this.type, this);
        this.graphicService.registerActorAnimations(this.type, this);
    }

}

export type ActorConfig = { tag: string, collisionGroupKey: string };
