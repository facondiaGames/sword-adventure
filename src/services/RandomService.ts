import { Random } from 'excalibur';
import { Service } from 'typedi';

@Service()
export class RandomService {

    private random: Random;

    constructor() {
        this.random = new Random();
    }

    public getFloating(min: number, max: number): number {
        return this.random.floating(min, max);
    }

    public getInteger(min: number, max: number): number {
        return this.random.integer(min, max);
    }

    public pickOne<T>(array: T[]): T {
        return this.random.pickOne(array);
    }

    public pickSet<T>(array: T[], numPicks: number, allowDuplicates: boolean): T[] {
        return this.random.pickSet(array, numPicks, allowDuplicates);
    }

    public shuffle<T>(array: T[]): T[] {
        return this.random.shuffle(array);
    }

    public getRandomId(): string {
        return Date.now().toString() + this.random.floating(0, 100).toString();
    }

}
