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

class App {
    constructor() {
        this._tracker = new CalorieTracker();

        this._loadEventListiners();

        this._tracker.loadItems();
    }

    _loadEventListiners() {
        document
            .querySelector('#meal-form')
            .addEventListener('submit', this._newItem.bind(this, 'meal'));

        document
            .querySelector('#workout-form')
            .addEventListener('submit', this._newItem.bind(this, 'workout'));

        document
            .querySelector('#meal-items')
            .addEventListener('click', this._removeItem.bind(this, 'meal'));

        document
            .querySelector('#workout-items')
            .addEventListener('click', this._removeItem.bind(this, 'workout'));

        document
            .querySelector('#filter-meals')
            .addEventListener('keyup', this._filterItems.bind(this, 'meal'));

        document
            .querySelector('#filter-workouts')
            .addEventListener('keyup', this._filterItems.bind(this, 'workout'));

        document
            .querySelector('#reset')
            .addEventListener('click', this._reset.bind(this));

        document
            .querySelector('#limit-form')
            .addEventListener('submit', this._setLimit.bind(this));
    }


    _newItem(type, e) {
        e.preventDefault();

        const name = document.querySelector(`#${type}-name`);
        const calories = document.querySelector(`#${type}-calories`);

        // Validate inputs
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
        }

        if (type === 'meal') {
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
        } else {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }

        name.value = '';
        calories.value = '';

        const collapseItem = document.querySelector(`#collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, {
            toggle: true,
        });
    }

    _removeItem(type, e) {
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if (confirm('Are you sure?')) {
                const itemCard = e.target.closest('.card');
                const id = itemCard.getAttribute('data-id');

                type === 'meal'
                    ? this._tracker.removeMeal(id)
                    : this._tracker.removeWorkout(id);

                itemCard.remove();
            }
        }
    }

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();

        document
            .querySelectorAll(`#${type}-items .card`)
            .forEach(item => {
                const nameElm = item.firstElementChild.firstElementChild;
                const name = nameElm.textContent;

                if (name.toLowerCase().indexOf(text) !== -1) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            })
    }

    _reset() {
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _setLimit(e) {
        e.preventDefault();

        const limit = document.querySelector('#limit');

        if (limit.value === '') {
            alert('Please add a limit');
            return;
        }

        this._tracker.setLimit(+limit.value);
        limit.value = '';

        const modalElm = document.querySelector('#limit-modal');
        const modal = bootstrap.Modal.getInstance(modalElm);
        modal.hide();
    }
}

const app = new App();