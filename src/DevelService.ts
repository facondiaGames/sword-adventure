import { Container, Service } from 'typedi';
import { MotionService, MotionTypes } from './services/MotionService';

@Service()
export class DevelService {

    private motionService: MotionService = Container.get(MotionService);

    public showDevelopmentTools(): void {
        const containerDiv: HTMLDivElement = document.createElement('div');
        containerDiv.id = 'dev-tools';
        containerDiv.classList.add('flex-row', 'absolute-top');
        const motionTypes: MotionTypes[] = ['keyboard', 'joystick'];
        motionTypes.forEach(type => {
            this.createMotionTypeButton(type, containerDiv);
        })
        document.body.appendChild(containerDiv);
    }

    private createMotionTypeButton(motionType: MotionTypes, containerDiv: HTMLDivElement) {
        const button: HTMLButtonElement = document.createElement('button');
        button.textContent = motionType;
        button.onclick = () => {
            this.motionService.setMotionType(motionType);
        }
        containerDiv.appendChild(button);
    }
}
