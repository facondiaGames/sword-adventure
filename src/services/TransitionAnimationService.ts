import { firstValueFrom } from 'rxjs';
import {Container, Service} from 'typedi';
import { SceneKeys } from '../types/BasicTypes';
import { DOMService, LayerIds, uiConfig } from './DOMService';
import {sceneTransitionAnimationEnd} from '../sceneTransitionAnimationEnd';
import {TransitionsConfig} from '../scenes/TransitionsConfig';
import { RandomService } from './RandomService';
import { Util } from '../Util';

@Service()
export class TransitionAnimationService {

    private domService: DOMService = Container.get(DOMService);
    private randomService: RandomService = Container.get(RandomService);
    private animationTokens: string[] = ['animate__zoomInRight', 'animate__tada', 'animate__bounce', 'animate__jello', 'animate__backInLeft', 'animate__lightSpeedInRight', 'animate__rotateInUpRight', 'animate__rollOut'];

    public animateSceneTransition(sceneKey: SceneKeys): Promise<void> {
        const sceneTransitionPromise: Promise<void> = firstValueFrom(sceneTransitionAnimationEnd);
        this.transitionAnimation(sceneKey);
        return sceneTransitionPromise;
    }

    private transitionAnimation(sceneKey: SceneKeys): void {
        const config = TransitionsConfig.animations[sceneKey];
        if(Util.isDefined(config)){
            const {animationDuration} = config;

            const layerIds: LayerIds[] = ['game', 'menu','joystick'];
            layerIds.forEach(id => this.domService.toggleElementVisibility(id, false));
            
            this.domService.toggleElementVisibility('animation-place', true)
            const animatedElement: HTMLElement = this.domService.getElement(uiConfig.sceneTransitionDiv);
            
            const animationToken = this.randomService.pickOne(this.animationTokens)
            
            const listener = () => {
                animatedElement.classList.remove(animationToken);
                this.domService.toggleElementVisibility('animation-place', false)
                animatedElement.style.removeProperty('--animate-duration');
                animatedElement.removeEventListener('animationend', listener);
                layerIds.forEach(id => this.domService.toggleElementVisibility(id, true));
                sceneTransitionAnimationEnd.next();
            };

            animatedElement.addEventListener('animationend', listener);
            animatedElement.style.setProperty('--animate-duration', `${animationDuration}s`);
            animatedElement.classList.add(animationToken);
        }
    }
}
