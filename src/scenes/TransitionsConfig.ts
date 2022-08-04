
import { SceneKeys } from "types/BasicTypes";

export module TransitionsConfig {

    export const animations: Partial<{ [key in SceneKeys]: { animationDuration: number } }> = {
        menuLevel: {
            animationDuration: 1.5,
        },
        playLevel: {
            animationDuration: 1.5,
        },

    }


}