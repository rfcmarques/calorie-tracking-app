class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);

        if (this._validateNameType(name)) {
            this.name = name;
        }

        if (this._validateCaloriesType(calories)
            && this._validateCaloriesValue(calories)) {
            this.calories = calories;
        }

    }

    _validateNameType(name) {
        if (name instanceof Array || name instanceof Object) {
            throw new Error('Name must be a valid value (string or number)');
        }

        return true;
    }

    _validateCaloriesType(calories) {
        if (typeof calories !== 'number' || isNaN(calories)) {
            throw new Error('Calories must be a valid number');
        }

        return true;
    }

    _validateCaloriesValue(calories) {
        if (calories < 0) {
            throw new Error('Calories must be a greater than 0');
        }

        return true
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);

        if (this._validateNameType(name)) {
            this.name = name;
        }
        
        if (this._validateCaloriesType(calories)
            && this._validateCaloriesValue(calories)) {
            this.calories = calories;
        }
    }

    _validateNameType(name) {
        if (name instanceof Array || name instanceof Object) {
            throw new Error('Name must be a valid value (string or number)');
        }

        return true;
    }


    _validateCaloriesType(calories) {
        if (typeof calories !== 'number' || isNaN(calories)) {
            throw new Error('Calories must be a valid number');
        }

        return true;
    }

    _validateCaloriesValue(calories) {
        if (calories < 0) {
            throw new Error('Calories must be a greater than 0');
        }

        return true
    }
}

export {
    Meal,
    Workout
}