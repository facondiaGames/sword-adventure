import { Container } from 'typedi';
import { DeviceService } from '../services/DeviceService';
import { ParallaxType, SceneKeys } from '../types/BasicTypes';
import { Axis, CollisionType, Scene, Shape, vec } from 'excalibur';
import { ZIndexes } from './ZIndexes';
import { QueryManagerService } from '../services/QueryManagerService';
import { Tags } from './Tags';
import { ParallaxTile } from '../actors/ParallaxTile';
import { TileSize } from '../types/GraphicTypes';

export module HorizontalParallaxConfig {

    export const perSceneParallaxConfig: ParallaxConfig<ParallaxType> = {
        playLevel: {
            layer1: scene => {
                const tileNumber = 2;
                const heightScaling = 1;
                const {layerWidth, layerHeight} = getGrahicTileSize(tileNumber, heightScaling);
                const tiles = buildGraphicTile(tileNumber, 'layer1', {height: layerHeight, width: layerWidth});
                const height: number = scene.camera.viewport.height;
                tiles.forEach((tile, index) => {
                    const xPos = index * layerWidth;
                    const yPos = height - layerHeight;
                    tile.z = ZIndexes.layers.layer1;
                    tile.pos = vec(xPos, yPos);
                    tile.on('exitviewport', () => {
                        const currentPosX = tile.pos.x;
                        const directionFactor = getDirectionFactor(scene);
                        tile.pos.x = currentPosX + directionFactor * tileNumber * layerWidth;
                    });
                    scene.add(tile);
                });
            },
            layer2: scene => {
                const tileNumber =6;
                const heightScaling = 0.8;
                const {layerWidth, layerHeight} = getGrahicTileSize(tileNumber, heightScaling);
                const tiles = buildGraphicTile(tileNumber, 'layer2', {height: layerHeight, width: layerWidth});
                const height: number = scene.camera.viewport.height;
                const queryManagerService = Container.get(QueryManagerService);
                const [layer4Tile] = queryManagerService.query<ParallaxTile>(Tags.LAYERS.horizontal.layer4, scene);
                const {height: layer4Height} = layer4Tile?.getTileSize() ?? {height: 0};
                tiles.forEach((tile, index) => {
                    const xPos = index * layerWidth;
                    const yPos = height - layerHeight - layer4Height;
                    tile.z = ZIndexes.layers.layer2;
                    tile.pos = vec(xPos, yPos);
                    tile.on('exitviewport', () => {
                        const directionFactor = getDirectionFactor(scene);
                        const currentPosX = tile.pos.x;
                        tile.pos.x = currentPosX + directionFactor * tileNumber * layerWidth;
                    });
                    scene.add(tile);
                });
            },
            layer3: scene => {
                const tileNumber = 8;
                const heightScaling = 0.2;
                const {layerWidth, layerHeight} = getGrahicTileSize(tileNumber, heightScaling);
                const tiles = buildGraphicTile(tileNumber, 'layer3', {height: layerHeight, width: layerWidth});
                const height: number = scene.camera.viewport.height;
                const queryManagerService = Container.get(QueryManagerService);
                const [layer4Tile] = queryManagerService.query<ParallaxTile>(Tags.LAYERS.horizontal.layer4, scene);
                const {height: layer4Height} = layer4Tile?.getTileSize() ?? {height: 0};
                tiles.forEach((tile, index) => {
                    const xPos = index * layerWidth;
                    const yPos = height - layerHeight - layer4Height;
                    tile.z = ZIndexes.layers.layer3;
                    tile.pos = vec(xPos, yPos);
                    tile.on('exitviewport', () => {
                        const directionFactor = getDirectionFactor(scene);
                        const currentPosX = tile.pos.x;
                        tile.pos.x = currentPosX + directionFactor * tileNumber * layerWidth;
                    });
                    scene.add(tile);
                });
            },
            layer4: scene => {
                const tileNumber = 10;
                const heightScaling = 0.02;
                const {layerWidth, layerHeight} = getGrahicTileSize(tileNumber, heightScaling);
                const tiles = buildGraphicTile(tileNumber, 'layer4', {height: layerHeight, width: layerWidth});
                tiles.forEach(tile => {
                    tile.body.collisionType = CollisionType.Fixed;
                    const collider = Shape.Box(layerWidth, layerHeight, vec(0, 0));
                    tile.collider.set(collider);
                });
                const height: number = scene.camera.viewport.height;
                tiles.forEach((tile, index) => {
                    const xPos = index * layerWidth;
                    const yPos = height - layerHeight;
                    tile.z = ZIndexes.layers.layer4;
                    tile.pos = vec(xPos, yPos);
                    tile.on('exitviewport', () => {
                        const currentPosX = tile.pos.x;
                        const directionFactor = getDirectionFactor(scene);
                        tile.pos.x = currentPosX + directionFactor * tileNumber * layerWidth;
                    });
                    scene.add(tile);
                });
            }
        }
    }

    export const cameraParallaxConfig: CameraParallaxSceneConfig = {
        playLevel: scene => {
            const queryManagerService: QueryManagerService = Container.get(QueryManagerService);
            const player = queryManagerService.getPlayer(scene);
            scene.camera.strategy.lockToActorAxis(player, Axis.X);
        }
    }

    export const headedRightVelocitiesMagnitude: { [key in ParallaxType | 'camera']: { x: number, y: number } } = {
        camera: {x: 20, y: 0},
        layer1: {x: -5, y: 0},
        layer2: {x: -40, y: 0},
        layer3: {x: -60, y: 0},
        layer4: {x: 0, y: 0},
    }

    function getGrahicTileSize(tileNumber: number, layerHeightScale: number) {
        const deviceService = Container.get(DeviceService);
        const {vw, vh} = deviceService.getViewportSize();
        const layerWidth: number = vw / (tileNumber - 1);
        const layerHeight: number = vh * layerHeightScale;
        return {layerWidth, layerHeight};
    }

    function buildGraphicTile(howMany:number, type: ParallaxType, tileSize: TileSize){
        const tiles: ParallaxTile[] = [];
        for(let i=0; i< howMany; i++){
            const layerTile = new ParallaxTile(type, tileSize);
            layerTile.anchor = vec(0, 0);
            layerTile.addTag(Tags.LAYERS.horizontal[type]);
            tiles.push(layerTile);
        }
        return tiles;
    }

    function getDirectionFactor(scene: Scene) {
        const queryManagerService = Container.get(QueryManagerService);
        const player = queryManagerService.getPlayer(scene);
        return player.vel.x >= 0 ? 1 : -1;
    }

}

type ParallaxConfig<K extends ParallaxType> = Partial<{ [key in SceneKeys]: Partial<{ [parallaxKey in K]: (scene: Scene) => void }> }>;
type CameraParallaxSceneConfig = Partial<{ [key in SceneKeys]: (scene: Scene) => void }>
