import { BehaviorSubject } from 'rxjs';
import { LevelEvents } from 'types/BasicTypes';

export const levelState: BehaviorSubject<LevelEvents> = new BehaviorSubject(undefined);
