class CalorieTracker {
    constructor() {
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

    // Public Methods/API //

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render();
    }

    // Private Methods //

    _displayCaloriesTotal() {
        const totalCaloriesElm = document.querySelector('#calories-total');
        totalCaloriesElm.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitElm = document.querySelector('#calories-limit');
        calorieLimitElm.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedElm = document.querySelector('#calories-consumed');

        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

        caloriesConsumedElm.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedElm = document.querySelector('#calories-burned');

        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);

        caloriesBurnedElm.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingElm = document.querySelector('#calories-remaining');
        const progressElm = document.querySelector('#calorie-progress');

        const remaining = this._calorieLimit - this._totalCalories;

        caloriesRemainingElm.innerHTML = remaining;

        if (remaining <= 0) {
            const parentDiv = caloriesRemainingElm.parentElement.parentElement;
            parentDiv.classList.remove('bg-light');
            parentDiv.classList.add('bg-danger');
            progressElm.classList.remove('bg-success');
            progressElm.classList.add('bg-danger');
        } else {
            const parentDiv = caloriesRemainingElm.parentElement.parentElement;
            parentDiv.classList.remove('bg-danger');
            parentDiv.classList.add('bg-light');
            progressElm.classList.remove('bg-danger');
            progressElm.classList.add('bg-success');
        }
    }

    _displayCaloriesProgress() {
        const progressElm = document.querySelector('#calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressElm.style.width = `${width}%`;
    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class App {
    constructor() {
        this._tracker = new CalorieTracker();

        document
            .querySelector('#meal-form')
            .addEventListener('submit', this._newMeal.bind(this));

        document
            .querySelector('#workout-form')
            .addEventListener('submit', this._newWorkout.bind(this));
    }

    _newMeal(e) {
        e.preventDefault();

        const name = document.querySelector('#meal-name');
        const calories = document.querySelector('#meal-calories');

        // Validate inputs
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
        }

        const meal = new Meal(name.value, +calories.value);

        this._tracker.addMeal(meal);

        name.value = '';
        calories.value = '';

        const collapseMeal = document.querySelector('#collapse-meal');
        const bsCollapse = new bootstrap.Collapse(collapseMeal, {
            toggle: true,
        });
    }

    _newWorkout(e) {
        e.preventDefault();

        const name = document.querySelector('#workout-name');
        const calories = document.querySelector('#workout-calories');

        // Validate inputs
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
        }

        const workout = new Workout(name.value, +calories.value);

        this._tracker.addWorkout(workout);

        name.value = '';
        calories.value = '';

        const collapseWorkout = document.querySelector('#collapse-workout');
        const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
            toggle: true,
        });
    }
}

const app = new App();