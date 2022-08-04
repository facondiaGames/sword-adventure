import { BehaviorSubject, first } from 'rxjs';
import Container, { Service } from 'typedi';
import { StoreService } from '../db-plugin/data-storage-sqlite/StoreService';
import { StoreConstants } from '../db-plugin/StoreConstants';

@Service()
export class GameStateService {
  private storeService = Container.get(StoreService);

  private coinsCount: BehaviorSubject<number> = new BehaviorSubject(undefined);

  public init(): void {
    this.storeService.getItemObs({ key: StoreConstants.coinsCount })
      .pipe(first())
      .subscribe((value) => {
        this.coinsCount.next(parseInt(value));
      });
  }

  public onCoinsCountChange() {
    return this.coinsCount.asObservable();
  }

  public getCoinCount() {
    return this.coinsCount.value;
  }

  public setCoinCount(newCount:number) {
    this.coinsCount.next(newCount);
    this.storeService.setItem({ key: StoreConstants.coinsCount, value: newCount });
  }
}
