import { Service } from 'typedi';
import { Actor, Scene } from 'excalibur';
import { Util } from '../Util';
import { Tags } from '../config/Tags';

@Service()
export class QueryManagerService {

    public query<T extends Actor>(tag: string, scene: Scene): T[] {
        return scene.actors.filter(actor => actor.tags.includes(tag)) as T[];
    }

    /**
     * to be used only when you're sure there's only one actor with specified tag
     */
    public querySingle<T extends Actor>(tags: string, scene: Scene): T {
        const allResults: T[] = scene.actors.filter(actor => actor.tags.includes(tags)) as T[];
        return Util.first(allResults);
    }

    public getPlayer(scene: Scene): Actor {
        return this.querySingle(Tags.ACTORS.player, scene);
    }

}
