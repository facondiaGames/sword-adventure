import { from, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Container, { Service } from 'typedi';
import { AsyncStoreService } from './AsyncStoreService';
import { StoreConstants } from '../StoreConstants';

@Service()
export class StoreService {
  private asyncStoreService: AsyncStoreService = Container.get(AsyncStoreService);

  public async init(): Promise<void> {
    this.asyncStoreService.init();
    await this.isKey({ key: StoreConstants.inizializedKey }).then(async (result) => {
      if (!result) {
        await this.setItem({ key: StoreConstants.inizializedKey, value: true });
        await this.setItem({ key: StoreConstants.coinsCount, value: 0 });
        await this.setItem({ key: StoreConstants.settings.sound, value: true });
        await this.setItem({ key: StoreConstants.settings.language, value: 'en' });
      }
    });
  }

  public getItemObs({ key }: { key: string }): Observable<string> {
    try {
      return from(this.asyncStoreService.openStore()).pipe(
        switchMap(() => from(this.asyncStoreService.getItem(key))),
      );
    } catch (e) {
      return throwError(e);
    }
  }

  public async getItem({ key }: { key: string }): Promise<string> {
    try {
      await this.asyncStoreService.openStore();
      return this.asyncStoreService.getItem(key);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public addNewItemObs({ key, value }: { key: string, value: any }) {
    try {
      const stringifiedData: string = typeof value === 'string' ? value : JSON.stringify(value);
      return from(this.asyncStoreService.openStore()).pipe(
        switchMap(() => from(this.asyncStoreService.setItem(key, stringifiedData))),
      );
    } catch (e) {
      return throwError(e);
    }
  }

  public setItemObs({ key, value }: { key: string, value: any }): Observable<void> {
    try {
      const stringifiedData: string = typeof value === 'string' ? value : JSON.stringify(value);
      return from(this.asyncStoreService.openStore()).pipe(
        switchMap(() => from(this.asyncStoreService.setItem(key, stringifiedData))),
      );
    } catch (e) {
      return throwError(e);
    }
  }

  public isKeyObs({ key }: { key: string }): Observable<boolean> {
    try {
      return from(this.asyncStoreService.openStore()).pipe(
        switchMap(() => from(this.asyncStoreService.isKey(key))),
      );
    } catch (e) {
      return throwError(e);
    }
  }

  public getAllKeysObs(): Observable<string[]> {
    try {
      return from(this.asyncStoreService.openStore()).pipe(
        switchMap(() => from(this.asyncStoreService.getAllKeys())),
      );
    } catch (e) {
      return throwError(e);
    }
  }

  public getAllValuesObs(): Observable<string[]> {
    try {
      return from(this.asyncStoreService.openStore()).pipe(
        switchMap(() => from(this.asyncStoreService.getAllValues())),
      );
    } catch (e) {
      return throwError(e);
    }
  }

  public getAllKeysValuesObs(): Observable<any[]> {
    return from(this.asyncStoreService.openStore()).pipe(
      switchMap(() => from(this.asyncStoreService.getAllKeysValues())),
    );
  }

  public openStoreObs(): Observable<void> {
    return from(this.asyncStoreService.openStore());
  }

  public clearStoreObs(): Observable<void> {
    return from(this.asyncStoreService.clearStore());
  }

  public async setItem({ key, value }: { key: string, value: any }): Promise<void> {
    try {
      const stringifiedData: string = typeof value === 'string' ? value : JSON.stringify(value);
      await this.asyncStoreService.openStore();
      await this.asyncStoreService.setItem(key, stringifiedData);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async isKey({ key }: { key: string }): Promise<boolean> {
    try {
      await this.asyncStoreService.openStore();
      return this.asyncStoreService.isKey(key);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
