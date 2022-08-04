import { Scene } from "excalibur";
import { TransitionAnimationService } from "../services/TransitionAnimationService";
import Container from "typedi";
import { SceneKeys } from "../types/BasicTypes";

export module SceneTransitions {

    export const transitions: SceneTransitions = {
        menuLevel: {
            prepareScene: () => {
                return Promise.resolve();
            },
            sceneStart: () => {
                return Promise.resolve();
            },
            sceneEnds: () => {
                return Promise.resolve();
            }
        },
        playLevel: {
            prepareScene: () => {
                return Promise.resolve();
            },
            sceneStart: () => {
                return Container.get(TransitionAnimationService).animateSceneTransition('playLevel');
            },
            sceneEnds: () => {
                return Promise.resolve();
            }
        }
    }
    

}





export type SceneTransitions = {[key in SceneKeys]: SceneTransition};
export type SceneTransition = { 
    prepareScene: () => Promise<any>,
    sceneStart: (scene?: Scene) => Promise<any>,
    sceneEnds: (scene?: Scene) => Promise<any>
 };

