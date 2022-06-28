import { DeviceSize } from './BasicTypes';

export type DeviceGameConfig = { [key in DeviceSize]: GameConfig };

export type GameConfig =
    {
        size: {
            width: number,
            height: number
        }
    };

export type PhysicsConfig = {
    gravity: { x: number, y: number }
}
