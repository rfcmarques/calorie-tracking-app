import Storage from "./Storage";

class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.querySelector('#limit').value = this._calorieLimit;
    }

    // Public Methods/API //

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveMeal(meal);
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        Storage.saveWorkout(workout);
        this._displayNewWorkout(workout);
        this._render();
    }

    removeMeal(id) {
        const index = this._meals.findIndex(meal => meal.id === id);

        if (index !== -1) {
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            Storage.updateTotalCalories(this._totalCalories);
            this._meals.splice(index, 1);
            Storage.removeMeal(id);
            this._render();
        }
    }

    removeWorkout(id) {
        const index = this._workouts.findIndex(workout => workout.id === id);

        if (index !== -1) {
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            Storage.updateTotalCalories(this._totalCalories);
            this._workouts.splice(index, 1);
            Storage.removeWorkout(id);
            this._render();
        }
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }

    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit);
        this._displayCaloriesLimit();
        this._render();
    }

    loadItems() {
        this._meals.forEach(meal => this._displayNewMeal(meal));
        this._workouts.forEach(workout => this._displayNewWorkout(workout));
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

    _displayNewMeal(meal) {
        const mealsElm = document.querySelector('#meal-items');
        const mealElm = document.createElement('div');
        mealElm.classList.add('card', 'my-2');
        mealElm.setAttribute('data-id', meal.id);
        mealElm.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mx-1">${meal.name}</h4>
              <div
                class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
              >
                ${meal.calories}
              </div>
              <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
         </div>
        `;

        mealsElm.appendChild(mealElm);
    }

    _displayNewWorkout(workout) {
        const workoutsElm = document.querySelector('#workout-items');
        const workoutElm = document.createElement('div');
        workoutElm.classList.add('card', 'my-2');
        workoutElm.setAttribute('data-id', workout.id);
        workoutElm.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mx-1">${workout.name}</h4>
              <div
                class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
              >
                ${workout.calories}
              </div>
              <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
         </div>
        `;

        workoutsElm.appendChild(workoutElm);
    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

export default CalorieTracker;