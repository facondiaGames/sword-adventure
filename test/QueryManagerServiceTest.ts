import { Actor } from 'excalibur';
import { QueryManagerService } from '../src/services/QueryManagerService';
import { ExcaliburTestUtils } from './ExcaliburTestUtil';
import { Tags } from '../src/config/Tags';

describe('QueryManagerService', () => {
  let queryManagerService: QueryManagerService;

  beforeEach(() => {
    queryManagerService = new QueryManagerService();
  });

  it('should return all tagged actors', async () => {
    const {
      scene, player, actor2, queryTag,
    } = await aSceneWithActors();

    const actors = queryManagerService.query(queryTag, scene);

    expect(actors.length).toBe(2);
    expect(actors.includes(player)).toBeTrue();
    expect(actors.includes(actor2)).toBeTrue();
  });

  it('getPlayer', async () => {
    const { scene, player } = await aSceneWithActors();

    const actual = queryManagerService.getPlayer(scene);

    expect(actual).toBe(player);
  });

  async function aSceneWithActors() {
    const { scene } = await ExcaliburTestUtils.anExcaliburJSGame();
    const actor1 = new Actor();
    const actor2 = new Actor();
    const actor3 = new Actor();
    const queryTag: string = Tags.ACTORS.player;
    const anotherTag = 'anotherTag';
    actor1.addTag(queryTag);
    actor2.addTag(queryTag);
    actor2.addTag(anotherTag);
    actor3.addTag(anotherTag);
    scene.add(actor1);
    scene.add(actor2);
    scene.add(actor3);
    return {
      scene, player: actor1, actor2, queryTag,
    };
  }
});
