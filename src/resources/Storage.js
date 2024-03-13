class Storage {
    static getCalorieLimit(defaultLimit = 2000) {
        return localStorage.getItem('calorieLimit') === null
            ? defaultLimit
            : +localStorage.getItem('calorieLimit');
    }

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }

    static getTotalCalories(defaultCalories = 0) {
        return localStorage.getItem('totalCalories') === null
            ? defaultCalories
            : +localStorage.getItem('totalCalories');
    }

    static updateTotalCalories(calories) {
        localStorage.setItem('totalCalories', calories);
    }

    static getMeals() {
        return localStorage.getItem('meals') === null
            ? []
            : JSON.parse(localStorage.getItem('meals'));
    }

    static saveMeal(meal) {
        const meals = this.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static removeMeal(id) {
        const meals = this.getMeals();
        meals.forEach((meal, index) => {
            if (meal.id === id) {
                meals.splice(index, 1);
            }
        })

        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static getWorkouts() {
        return localStorage.getItem('workouts') === null
            ? []
            : JSON.parse(localStorage.getItem('workouts'));
    }

    static saveWorkout(workout) {
        const workouts = this.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static removeWorkout(id) {
        const workouts = this.getWorkouts();
        workouts.forEach((workout, index) => {
            if (workout.id === id) {
                workouts.splice(index, 1);
            }
        })

        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static clearAll() {
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('meals');
        localStorage.removeItem('workouts');
    }
}

export default Storage;