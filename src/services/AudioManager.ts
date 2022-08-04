import { Container, Service } from 'typedi';
import { filter } from 'rxjs';
import { StoreService } from '../db-plugin/data-storage-sqlite/StoreService';
import { StoreConstants } from '../db-plugin/StoreConstants';
import { Util } from '../Util';
import { AudioAssets } from '../config/audio/AudioAssets';

@Service()
export class AudioManager {
  private storeService: StoreService = Container.get(StoreService);

  private soundsOn: boolean;

  private backgroundVolume: number = 0.5;

  public init(): void {
    this.storeService.getItemObs({ key: StoreConstants.settings.sound })
      .pipe(filter(Util.isDefined))
      .subscribe((isActive) => {
        this.soundsOn = isActive === 'true';
        AudioAssets.tracks.backgroundMusic.volume = this.soundsOn ? this.backgroundVolume : 0;
      });
  }

  public startBackgroundMusic(): void {
    AudioAssets.tracks.backgroundMusic.volume = 0;
    AudioAssets.tracks.backgroundMusic.volume = this.soundsOn ? this.backgroundVolume : 0;
    AudioAssets.tracks.backgroundMusic.loop = true;
    if (!AudioAssets.tracks.backgroundMusic.isPlaying()) {
      AudioAssets.tracks.backgroundMusic.play();
    }
  }

  public setVolumeOn(on: boolean): void {
    this.soundsOn = on;
    AudioAssets.tracks.backgroundMusic.volume = this.soundsOn ? this.backgroundVolume : 0;
    if (this.soundsOn) {
      this.startBackgroundMusic();
    }
  }

  public stop(): void {
    AudioAssets.tracks.backgroundMusic.stop();
  }
}
