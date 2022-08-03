import { Container, Service } from 'typedi';
import { DeviceService } from './DeviceService';
import { Configs } from '../config/Configs';
import { GameConfig, PhysicsConfig } from '../types/Types';

@Service()
export class GameConfigService {
  private deviceService: DeviceService = Container.get(DeviceService);

  public getPhysicsConfig(): PhysicsConfig {
    return Configs.physics;
  }

  public getDeviceConfig(): GameConfig {
    const deviceSize = this.deviceService.getDeviceSize();
    return Configs.device[deviceSize];
  }
}
