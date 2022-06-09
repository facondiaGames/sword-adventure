import { Container, Service } from 'typedi';
import nipplejs, { JoystickManager } from 'nipplejs';
import { DOMService } from './DOMService';
import { Util } from '../Util';

@Service()
export class JoystickFactory {

    private domService: DOMService = Container.get(DOMService);
    private joystickManager: JoystickManager;

    public getJoystick(): JoystickManager {
        if (Util.isDefined(this.joystickManager)) {
            return this.joystickManager;
        }
        const position: { bottom: string; right: string } = {bottom: '35%', right: '20%'};
        const joystickDomElement: HTMLElement = this.domService.getElement('joystick');
        this.joystickManager = nipplejs.create({
            zone: joystickDomElement,
            mode: 'static',
            position,
            color: 'black',
            size: 150,
            shape: 'circle',
        });
        return this.joystickManager;
    }

    public destroy(): void {
        this.joystickManager?.destroy();
        this.joystickManager = undefined;
    }

}

