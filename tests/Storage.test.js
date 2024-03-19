import Storage from '../src/resources/Storage';

describe('Storage class', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should set and get the calorie limit', () => {
        const defaultLimit = 2000;
        expect(Storage.getCalorieLimit()).toBe(defaultLimit);

        const newLimit = 2500;
        Storage.setCalorieLimit(newLimit);
        expect(Storage.getCalorieLimit()).toBe(newLimit);
    })

    it('should save and retrieve meals correctly', () => {
        const meal = { id: 'meal1', name: 'Sandwich', calories: 300 };
        Storage.saveMeal(meal);
        const meals = Storage.getMeals();
        expect(meals).toEqual([meal]);
    });

    it('should save and retrieve workouts correctly', () => {
        const workout = { id: 'workout1', name: 'Jogging', calories: 500 };
        Storage.saveWorkout(workout);
        const workouts = Storage.getWorkouts();
        expect(workouts).toEqual([workout]);
    });
})