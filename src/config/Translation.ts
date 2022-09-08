export module Translation {

    export const keys: TranslationKeys = {
      play: 'playKey',
      score: 'scoreKey',
      sound: 'soundKey',
      language: 'languageKey',
      yourScore: 'yourScoreKey',
      goToMainMenu: 'goToMainMenuKey',
      noTranslation: 'noTranslationKey',
      backButton: 'backKey',
      playSwordAdventure: 'playSwordAdventureKey',
      italian: 'italianKey',
      english: 'englishKey',
      menuHeading: 'menuHeadingKey',
      menuSubHeading: 'menuSubHeadingKey',
      readTutorials: 'readTutorialsKey'
    };

    export const immutable: NotToTranslateKeys= {
      facondiaGames: 'Facondia Games',
      gitHub: 'GitHub'
    }

}

type NotToTranslate = 'facondiaGames'| 'gitHub'
type NotToTranslateKeys = { [key in NotToTranslate]: string };

type TranslationKeys = { [key in ToTranslate]: string };
type ToTranslate = 'play' | 'score' | 'yourScore'
    | 'sound' | 'language' | 'goToMainMenu'
    | 'italian' | 'english'
    | 'backButton'
    | 'playSwordAdventure'
    | 'menuHeading'
    | 'menuSubHeading'
    | 'readTutorials'
    | 'noTranslation';
