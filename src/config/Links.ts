export module Links {

    export const keys: Links = {
      facondiaWebSite: 'https://nicastro.in/facondia-games',
      facondiaGitHub: 'https://github.com/facondiaGames/sword-adventure',
      facondiaExcaliburTutorials: 'https://nicastro.in/facondia-games/tutorials/excalibur',
      facondiaInstagram: 'https://www.instagram.com/facondiagames',
      facondiaTwitter: 'https://twitter.com/FacondiaGames'
    };

}

type Links = {[key in LinkKeys]:string}
type LinkKeys = 'facondiaWebSite' | 'facondiaGitHub' | 'facondiaExcaliburTutorials' | 'facondiaInstagram' |'facondiaTwitter';