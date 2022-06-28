import 'reflect-metadata';
import { DeviceService } from '../src/services/DeviceService';
import { Container } from 'typedi';

/**
 * https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
 */
window.onerror = function (err) {
    if (err === 'ResizeObserver loop limit exceeded') {
        console.warn('Ignored: ResizeObserver loop limit exceeded');
        return false;
    } else {
        return err
    }
}

const deviceService: DeviceService = Container.get(DeviceService);
deviceService.init();
