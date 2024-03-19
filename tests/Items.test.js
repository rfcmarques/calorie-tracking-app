import { Meal, Workout } from '../src/resources/Items';

describe('General Pratices to both Classes', () => {
    it('should assign unique IDs', () => {
        const items = [];
        for (let i = 0; i < 50; i++) {
            items.push(new Meal(`Meal${i}`, i * 100));
            items.push(new Workout(`Workout${i}`, i * 100));
        }
        const ids = items.map(item => item.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(items.length);
    });
});

describe('Meal class', () => {
    it('should correctly assign name and calories', () => {
        const meal = new Meal('Pasta', 800);
        expect(meal.name).toBe('Pasta');
        expect(meal.calories).toBe(800);
    });

    it('should generate a non-empty id string', () => {
        const meal = new Meal('Salad', 300);
        expect(meal.id).toBeTruthy();
        expect(typeof meal.id).toBe('string');
        expect(meal.id.length).toBeGreaterThan(0);
    });

    it('should throw an error with invalid name input', () => {
        expect(() => {
            new Meal([], 100);
        }).toThrow();
        expect(() => {
            new Meal({}, 100);
        }).toThrow();
    });

    it('should throw an error with invalid calorie input', () => {
        expect(() => {
            new Meal('Pizza', 'a lot');
        }).toThrow();
    });

    it('should throw an error with negative calorie input', () => {
        expect(() => {
            new Meal('Pizza', -1);
        }).toThrow();
    });
});

describe('Workout class', () => {
    it('should correctly assign name and calories', () => {
        const workout = new Workout('Running', 500);
        expect(workout.name).toBe('Running');
        expect(workout.calories).toBe(500);
    });

    it('should generate a non-empty id string', () => {
        const workout = new Workout('Swimming', 700);
        expect(workout.id).toBeTruthy();
        expect(typeof workout.id).toBe('string');
        expect(workout.id.length).toBeGreaterThan(0);
    });

    it('should throw an error with invalid name input', () => {
        expect(() => {
            new Workout([], 100);
        }).toThrow();
        expect(() => {
            new Workout({}, 100);
        }).toThrow();
    });

    it('should throw an error with invalid calorie input', () => {
        expect(() => {
            new Workout('Running', 'a lot');
        }).toThrow();
    });

    it('should throw an error with negative calorie input', () => {
        expect(() => {
            new Workout('Pizza', -1);
        }).toThrow();
    });
});