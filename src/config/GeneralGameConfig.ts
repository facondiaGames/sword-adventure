export module Configs {

    export const game: GeneralGameConfig = {
        size: {
            width: 360,
            height: 640
        },

    }
}

export type GeneralGameConfig = {
    size: {
        width: number,
        height: number
    }
};
