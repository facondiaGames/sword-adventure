import 'reflect-metadata';
import { Container } from 'typedi';
import { DeviceService } from '../src/services/DeviceService';

/**
 * https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
 */
window.onerror = function (err) {
  if (err === 'ResizeObserver loop limit exceeded') {
    console.warn('Ignored: ResizeObserver loop limit exceeded');
    return false;
  }
  return err;
};

const deviceService: DeviceService = Container.get(DeviceService);
deviceService.init();
