import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';
import { Service } from 'typedi';
import { Configs } from '../../config/Configs';

@Service()
export class AsyncStoreService {
  public isService: boolean = false;

  private store: any;

  private platform: string;

  private readonly connectionData = Configs.connectionData;

  constructor() {}

  public init(): void {
    this.platform = Capacitor.getPlatform();
    this.store = CapacitorDataStorageSqlite;
    this.isService = true;
  }

  public async openStore(): Promise<void> {
    if (this.isService && this.store != null) {
      try {
        await this.store.openStore(this.connectionData);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('openStore: Store not opened'));
    }
  }

  public async setTable(): Promise<void> {
    if (this.isService && this.store != null) {
      try {
        const data = { table: this.connectionData.table };
        await this.store.setTable(data);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(new Error('setTable: Store not opened'));
    }
  }

  public async setItem(key: string, value: string): Promise<void> {
    if (this.isService && this.store != null) {
      if (key.length > 0) {
        try {
          await this.store.set({ key, value });
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        const message: string = 'setItem: Must give a key';
        return Promise.reject(new Error(message));
      }
    } else {
      const message = 'setItem: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async getItem(key: string): Promise<string> {
    if (this.isService && this.store != null) {
      if (key.length > 0) {
        try {
          const { value } = await this.store.get({ key });
          return Promise.resolve(value);
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        const message = 'getItem: Must give a key';
        return Promise.reject(new Error(message));
      }
    } else {
      const message = 'getItem: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async isKey(key: string): Promise<boolean> {
    if (this.isService && this.store != null) {
      if (key.length > 0) {
        try {
          const { result } = await this.store.iskey({ key });
          return Promise.resolve(result);
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        const message = 'isKey: Must give a key';
        return Promise.reject(new Error(message));
      }
    } else {
      const message = 'isKey: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async getAllKeys(): Promise<Array<string>> {
    if (this.isService && this.store != null) {
      try {
        const { keys } = await this.store.keys();
        return Promise.resolve(keys);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      const message = 'getAllKeys: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async getAllValues(): Promise<Array<string>> {
    if (this.isService && this.store != null) {
      try {
        const { values } = await this.store.values();
        return Promise.resolve(values);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      const message = 'getAllValues: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async getFilterValues(filter: string): Promise<Array<string>> {
    if (this.isService && this.store != null) {
      try {
        const { values } = await this.store.filtervalues({ filter });
        return Promise.resolve(values);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      const message = 'getFilterValues: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async getAllKeysValues(): Promise<Array<any>> {
    if (this.isService && this.store != null) {
      try {
        const { keysvalues } = await this.store.keysvalues();
        return Promise.resolve(keysvalues);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      const message = 'getAllKeysValues: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async removeItem(key: string): Promise<void> {
    if (this.isService && this.store != null) {
      if (key.length > 0) {
        try {
          await this.store.remove({ key });
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        const message = 'removeItem: Must give a key';
        return Promise.reject(new Error(message));
      }
    } else {
      const message = 'removeItem: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  public async clearStore(): Promise<void> {
    if (this.isService && this.store != null) {
      try {
        await this.store.clear();
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err.message);
      }
    } else {
      const message = 'clear: Store not opened';
      return Promise.reject(new Error(message));
    }
  }

  /**
     *
     * only for android!! not implemented for web!!
     */
  public async deleteStore(): Promise<void> {
    this.init();
    if (this.isService && this.store != null) {
      try {
        const connData = { database: this.connectionData.database };
        await this.store.deconsteStore(connData);
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err.message);
      }
    } else {
      const message = 'deconsteStore: Store not opened';
      return Promise.reject(new Error(message));
    }
  }
}
