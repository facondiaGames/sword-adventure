import Container, { Service } from 'typedi';
import i18next, { TFunction } from 'i18next';
import { BehaviorSubject, filter } from 'rxjs';
import { Util } from '../Util';
import { Translation } from '../config/Translation';
import { StoreService } from '../db-plugin/data-storage-sqlite/StoreService';
import { StoreConstants } from '../db-plugin/StoreConstants';
import en from '../assets/i18n/en.json';
import it from '../assets/i18n/it.json';

@Service()
export class LanguageService {
  private currentLanguage: AvailableLanguages;

  private currentLanguageSub: BehaviorSubject<AvailableLanguages> = new BehaviorSubject(undefined);

  private tFunction: TFunction;

  private storeService = Container.get(StoreService);

  public getCurrentLanguage(): AvailableLanguages {
    return this.currentLanguage;
  }

  public async init(): Promise<void> {
    this.currentLanguage = await this.storeService.getItem({ key: StoreConstants.settings.language }) as AvailableLanguages;
    this.tFunction = await i18next.init({
      lng: this.currentLanguage, // if you're using a language detector, do not define the lng option
      debug: false,
      resources: {
        en: {
          translation: {
            ...en,
          },
        },
        it: {
          translation: {
            ...it,
          },
        },
      },
    });
  }

  public translate(key: string): string {
    const noTranslation: string = i18next.t(Translation.keys.noTranslation);
    return this.tFunction(key, noTranslation);
  }

  public async changeLanguage(languageKey: AvailableLanguages) {
    this.tFunction = await i18next.changeLanguage(languageKey);
    this.currentLanguage = languageKey;
    this.currentLanguageSub.next(this.currentLanguage);
    this.storeService.setItem({ key: StoreConstants.settings.language, value: languageKey });
  }

  public onLanguageChange() {
    return this.currentLanguageSub.pipe(filter((value) => Util.isDefined(value)));
  }
}

export type AvailableLanguages = 'it' | 'en';
