import { Container } from 'typedi';
import { DeviceService } from '../services/DeviceService';
import { ParallaxType, SceneKeys } from '../types/BasicTypes';
import { Actor, Axis, CollisionType, Color, Rectangle, Scene, Shape, vec } from 'excalibur';
import { ZIndexes } from './ZIndexes';
import { QueryManagerService } from '../services/QueryManagerService';
import { Tags } from './Tags';

export module HorizontalParallaxConfig {

    export const perSceneParallaxConfig: ParallaxConfig<ParallaxType> = {
        playLevel: {
            // for now we'll use rectangles. In the end we'll use real assets
            layer1: scene => {
                const tileNumber = 2;
                const heightScaling = 1;
                const {layerWidth, layerHeight} = getLayerSize(tileNumber, heightScaling);
                const rectangles = buildColorfulRectangles(tileNumber, layerWidth, layerHeight);
                const tiles = buildTile(rectangles, 'layer1');
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
                const tileNumber = 4;
                const heightScaling = 0.6;
                const {layerWidth, layerHeight} = getLayerSize(tileNumber, heightScaling);
                const rectangles = buildColorfulRectangles(tileNumber, layerWidth, layerHeight);
                const tiles = buildTile(rectangles, 'layer2');
                const height: number = scene.camera.viewport.height;
                tiles.forEach((tile, index) => {
                    const xPos = index * layerWidth;
                    const yPos = height - layerHeight;
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
                const tileNumber = 10;
                const heightScaling = 0.15;
                const {layerWidth, layerHeight} = getLayerSize(tileNumber, heightScaling);
                const rectangles = buildColorfulRectangles(tileNumber, layerWidth, layerHeight);
                const tiles = buildTile(rectangles, 'layer3');
                tiles.forEach(tile => {
                    tile.body.collisionType = CollisionType.Fixed;
                    const collider = Shape.Box(layerWidth, layerHeight, vec(0, 0));
                    tile.collider.set(collider);
                });
                const height: number = scene.camera.viewport.height;
                tiles.forEach((tile, index) => {
                    const xPos = index * layerWidth;
                    const yPos = height - layerHeight;
                    tile.z = ZIndexes.layers.layer3;
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
        camera: {x: 10, y: 0},
        layer1: {x: 0, y: 0},
        layer2: {x: -10, y: 0},
        layer3: {x: -20, y: 0},
    }

    function getLayerSize(tileNumber: number, layerHeightScale: number) {
        const deviceService = Container.get(DeviceService);
        const {vw, vh} = deviceService.getViewportSize();
        const layerWidth: number = vw / (tileNumber - 1);
        const layerHeight: number = vh * layerHeightScale;
        return {layerWidth, layerHeight};
    }

    function buildColorfulRectangles(tileNumber: number, layerWidth: number, layerHeight: number) {
        const colors: Color[] = [];
        for (let i = 0; i < tileNumber; i++) {
            const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            const color = Color.fromHex(randomColor);
            colors.push(color);
        }
        return colors.map(color => {
            const rectangle = new Rectangle({color, width: layerWidth, height: layerHeight});
            rectangle.origin = vec(0, 0);
            return rectangle;
        });
    }

    function buildTile(rectangles: Rectangle[], type: ParallaxType) {
        return rectangles.map(rectangle => {
            const layerTile = new Actor();
            layerTile.anchor = vec(0, 0);
            layerTile.graphics.use(rectangle);
            layerTile.addTag(Tags.LAYERS.horizontal[type]);
            return layerTile;
        });
    }

    function getDirectionFactor(scene: Scene) {
        const queryManagerService = Container.get(QueryManagerService);
        const player = queryManagerService.getPlayer(scene);
        return player.vel.x >= 0 ? 1 : -1;
    }

}

type ParallaxConfig<K extends ParallaxType> = Partial<{ [key in SceneKeys]: Partial<{ [parallaxKey in K]: (scene: Scene) => void }> }>;
type CameraParallaxSceneConfig = Partial<{ [key in SceneKeys]: (scene: Scene) => void }>
