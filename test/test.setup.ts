import 'reflect-metadata';
import { anything, spy, when } from 'ts-mockito';
import { Container } from 'typedi';
import { StoreService } from '../src/db-plugin/data-storage-sqlite/StoreService';
import { DeviceService } from '../src/services/DeviceService';
import { LanguageService } from '../src/services/LanguageService';

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

const languageService = spy(Container.get(LanguageService));
when(languageService.translate(anything())).thenCall(() => { /* do nothing */ });