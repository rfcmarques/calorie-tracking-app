import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import './assets/css/bootstrap.css';
import './assets/css/style.css';

import CalorieTracker from './resources/CalorieTracker';
import { Meal, Workout } from './resources/Items';

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
        const bsCollapse = new Collapse(collapseItem, {
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

        const modalElm = document.querySelector('#limit-modal');
        const modal = Modal.getInstance(modalElm);
        modal.hide();
    }
}

const app = new App();