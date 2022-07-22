import { DeviceGameConfig, PhysicsConfig } from '../types/Types';

export module Configs {

    export const physics: PhysicsConfig = {
      gravity: { x: 0, y: 200 },
    };

    /* TODO if not needed, remove */
    export const device: DeviceGameConfig = {
      small: {
        size: {
          height: 360,
          width: 640,
        },
      },
      medium: {
        size: {
          height: 360,
          width: 640,
        },
      },
      large: {
        size: {
          height: 800,
          width: 1280,
        },
      },
    };
}
