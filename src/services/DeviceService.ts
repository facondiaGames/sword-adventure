import { Service } from 'typedi';
import { DeviceSize } from '../types/BasicTypes';

@Service()
export class DeviceService {

    private deviceSize: DeviceSize;

    public init(): void {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const viewportSmall = vw <= 640 && vh <= 360;
        const viewportBig = vw > 900 && vh > 700;
        if (viewportSmall) {
            this.deviceSize = 'small';
        } else if (viewportBig) {
            this.deviceSize = 'large';
        } else {
            this.deviceSize = 'medium';
        }
    }

    public getViewportSize(): ViewportSize {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return {vw, vh};
    }

    /* TODO if not needed, remove */
    public getDeviceSize(): DeviceSize {
        return this.deviceSize;
    }

}

export type ViewportSize = { vw: number; vh: number };
