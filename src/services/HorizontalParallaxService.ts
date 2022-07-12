import { Container, Service } from 'typedi';
import { Actor, Scene, vec, Vector } from 'excalibur';
import { ParallaxType, SceneKeys } from '../types/BasicTypes';
import { HorizontalParallaxConfig } from '../config/HorizontalParallaxConfig';
import { QueryManagerService } from './QueryManagerService';
import { Tags } from '../config/Tags';

@Service()
export class HorizontalParallaxService {

    private queryManagerService = Container.get(QueryManagerService);

    public configureParallax(sceneKey: SceneKeys, scene: Scene) {
        const cameraConfig = HorizontalParallaxConfig.cameraParallaxConfig[sceneKey];
        cameraConfig(scene);
        const layerTypes: ParallaxType[] = ['layer4','layer3','layer2', 'layer1'];
        layerTypes.forEach(layerType => {
            const sceneLayerConfig = HorizontalParallaxConfig.perSceneParallaxConfig[sceneKey][layerType];
            sceneLayerConfig(scene);
        });
    }

    public startParallax(directionFactor: number, scene: Scene) {
        const {layer1: layer1Tag, layer2: layer2Tag, layer3: layer3Tag} = Tags.LAYERS.horizontal;
        [layer1Tag, layer2Tag, layer3Tag].forEach(tag => {
            const tiles: Actor[] = this.queryManagerService.query(tag, scene);
            const {x, y} = HorizontalParallaxConfig.headedRightVelocitiesMagnitude[tag];
            const vel: Vector = vec(x * directionFactor, y);
            tiles.forEach(tile => tile.vel = vel);
        });
    }

    public stopParallax(scene: Scene) {
        const {layer1: layer1Tag, layer2: layer2Tag, layer3: layer3Tag} = Tags.LAYERS.horizontal;
        [layer1Tag, layer2Tag, layer3Tag].forEach(tag => {
            const tiles: Actor[] = this.queryManagerService.query(tag, scene);
            const vel: Vector = vec(0, 0);
            tiles.forEach(tile => tile.vel = vel);
        });
    }

}

