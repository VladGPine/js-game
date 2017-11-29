'use strict';

class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

<<<<<<< HEAD
	plus(vectorObj) {
		if (!(vectorObj instanceof Vector)) throw new Error('Можно прибавлять к вектору только вектор типа Vector');
		let vector = new Vector(this.x + vectorObj.x, this.y + vectorObj.y);
		return vector;
	}
=======
    plus (vectorObj) {
        if (!(vectorObj instanceof Vector)) throw new Error('Можно прибавлять к вектору только вектор типа Vector'); 
        let vector = new Vector(this.x + vectorObj.x, this.y + vectorObj.y);
        // console.log(vector);
        return vector;
    }
>>>>>>> 23af28450ed83e00790430d762dfb8bc7b6adb6d

	times(multiplier) {
		let vector = new Vector(this.x * multiplier, this.y * multiplier);
		return vector;
	}
}

class Actor {
<<<<<<< HEAD
	constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {
		if (!(pos instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
		if (!(size instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
		if (!(speed instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
		this.pos = pos;
		this.size = size;
		this.speed = speed;
		Object.defineProperty(this, 'left', {
			value: Math.min(this.pos.x, this.pos.x + this.size.x),
			writable: false,
			configurable: false,
			enumerable: true
		});
		Object.defineProperty(this, 'right', {
			value: Math.max(this.pos.x, this.pos.x + this.size.x),
			writable: false,
			configurable: false,
			enumerable: true
		});
		Object.defineProperty(this, 'top', {
			value: Math.min(this.pos.y, this.pos.y + this.size.y),
			writable: false,
			configurable: false,
			enumerable: true
		});
		Object.defineProperty(this, 'bottom', {
			value: Math.max(this.pos.y, this.pos.y + this.size.y),
			writable: false,
			configurable: false,
			enumerable: true
		});
		Object.defineProperty(this, 'type', {
			value: 'actor',
			writable: false,
			configurable: false,
			enumerable: true
		});
	}

	isIntersect(movingObj = new Actor()) {
		if (!(movingObj instanceof Actor)) throw new Error('Неопределенный тип, отличный от объекта типа Actor');
		if (movingObj === this) return false;
		if (movingObj.left >= this.left || movingObj.left >= this.right) return false;
		if (movingObj.right <= this.right || movingObj.right <= this.left) return false;
		if (movingObj.top >= this.top || movingObj.top >= this.bottom) return false;
		if (movingObj.bottom <= this.bottom || movingObj.bottom <= this.top) return false;
		// if (movingObj.left >= this.left || movingObj.right <= this.right || movingObj.top >= this.top || movingObj.bottom <= this.bottom) return false;
		return true;
	}

	act() {

	}
=======
    constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {
        if (!(pos instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
        if (!(size instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
        if (!(speed instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
        this.pos = pos;
        this.size = size;
        this.speed = speed;
        Object.defineProperty(this, 'type', {
            value: 'actor',
            writable: false,
            configurable: false,
            enumerable: true
        });
    }

    act () {

    }
>>>>>>> 23af28450ed83e00790430d762dfb8bc7b6adb6d
}