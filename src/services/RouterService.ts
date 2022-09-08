import { Service } from 'typedi';
import { Actor, Scene } from 'excalibur';
import { Util } from '../Util';
import { Tags } from '../config/Tags';

@Service()
export class RouterService {
  
public openLink(url:string){
  window.open(url, '_blank');
}

}
