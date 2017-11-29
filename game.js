'use strict';

class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	plus(vectorObj) {
		if (!(vectorObj instanceof Vector)) throw new Error('Можно прибавлять к вектору только вектор типа Vector');
		let vector = new Vector(this.x + vectorObj.x, this.y + vectorObj.y);
		return vector;
	}

	times(multiplier) {
		let vector = new Vector(this.x * multiplier, this.y * multiplier);
		return vector;
	}
}

class Actor {
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

	isIntersect(movingObj) {
		if (!(movingObj instanceof Actor)) throw new Error('Неопределенный тип, отличный от объекта типа Actor');
		if (movingObj === this) return false;
		if (movingObj.left >= this.right || movingObj.right <= this.left || movingObj.top >= this.bottom || movingObj.bottom <= this.top) return false;

		return true;
	}

	act() {

	}
}

class Level {
	constructor(grid, actors) {
		this.grid = grid;
		this.actors = actors;
		this.player = {
			type: 'player'
		};
		Object.defineProperty(this, 'height', {
			value: 0
		});
		Object.defineProperty(this, 'width', {
			value: 0
		});
		Object.defineProperty(this, 'status', {
			value: null,
			writable: true,
			configurable: true,
			enumerable: true
		});
		Object.defineProperty(this, 'finishDelay', {
			value: 1,
			writable: true,
			configurable: true,
			enumerable: true
		});
	}

	isFinished() {
		if ((this.status != null) && (this.finishDelay < 0)) return true;
		return false;
	}

	actorAt(movingObj) {
		if ((!(movingObj instanceof Actor)) || (movingObj === undefined)) throw new Error('Неопределенный тип, отличный от объекта типа Actor');
		if (movingObj === this) return undefined;
		

	}
}