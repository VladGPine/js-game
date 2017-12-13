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
			configurable: true,
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

		Object.defineProperty(this, 'height', {
			value: 0,
			writable: true,
			configurable: true,
			enumerable: true
		});

		Object.defineProperty(this, 'width', {
			value: 0,
			writable: true,
			configurable: true,
			enumerable: true
		});

		if (Array.isArray(this.grid)) {
			this.height = this.grid.length;
				for (let i of this.grid) {
					if (Array.isArray(i)) this.width = i.length;
				}
		}

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
		if (Array.isArray(this.actors))
			for (let player of this.actors) {
					if (player.type === 'actor') {
						this.player = player;
						break;
					}
			}
		this.arg = arguments.length;
	}

	isFinished() {
		return (this.status !== null) && (this.finishDelay < 0);
	}

	actorAt(movingObj) {
		if ((!(movingObj instanceof Actor))) throw new Error('Неопределенный тип, отличный от объекта типа Actor');
		if (movingObj === this || this.arg === 0) return undefined;
		for (let obj of this.actors) {
			if (obj.isIntersect(movingObj)) return obj;
		}
		return undefined;
	}

	obstacleAt(position, size) {
		if (!(position instanceof Vector) || !(size instanceof Vector)) throw new Error('Неопределенный тип, отличный от объекта типа Vector');
		if (position.x < 0) return 'wall';
		if (position.y < 0) return 'wall';
		if ((position.x + size.x) > this.height) return 'wall';
		if ((position.y + size.y) > this.width) return 'lava';
		for (let x = Math.ceil(position.x); x <= Math.ceil(position.x + size.x); x++)
			for (let y = Math.ceil(position.y); y < Math.ceil(position.y + size.y); y++) {
				if (this.grid[y][x] === 'wall') return 'wall';
			}
		for (let x = Math.ceil(position.x); x <= Math.ceil(position.x + size.x); x++)
			for (let y = Math.ceil(position.y); y <= Math.ceil(position.y + size.y); y++) {
				if (this.grid[y][x] === 'lava') return 'lava';
			}
			return undefined;
	}

	removeActor(actor) {
		if (!(actor instanceof Actor) && !actor) return;
		for (let i = 0; i < this.actors.length; i++) {
			if (this.actors[i] === actor) return delete this.actors[i];
		}
	}

	noMoreActors(movingObjType) {
		if (this.actors === undefined) return true;
		return this.player.type === movingObjType;
	}

	playerTouched(obstacleType, touched) {
		if (this.status !== null) return;
		if ((obstacleType === 'lava') || (obstacleType === 'fireball')) {
			this.status = 'lost';
			return;
		}
		if ((obstacleType === 'coin') && (Object.defineProperty(touched, 'type', {
			value: 'coin'
			}))) {
			this.removeActor(touched);
			if (this.noMoreActors('coin')) {
				this.status = 'won';
			}
		}
	}
}

class LevelParser {
	constructor (dictionary) {
		this.dictionary = dictionary;
	}

	actorFromSymbol(symbol) {
		if (symbol === undefined) {
			return undefined;
		}
		if (Object.keys(this.dictionary).indexOf(symbol) !== -1){
			return this.dictionary[symbol];
		}
		return undefined;
	}

	obstacleFromSymbol(symbol) {
		if (symbol === 'x') {
			return 'wall';
		}else if (symbol === '!') {
			return 'lava';
		} else {
			return undefined;
		}
	}

	createGrid(arrayString) {
		let arr = [];
		for (let i = 0; i < arrayString.length; i++) {
			arr[i] = [];
			for (let n = 0; n < arrayString[i].length; n++) {
				arr[i][n] = this.obstacleFromSymbol(arrayString[i][n]);
			}
		}
		return arr;
	}

	createActors(arrayString) {
		const arrayMovingObj = [];

		if (this.dictionary) {
			arrayString.forEach((line, y) => {
				line.split('').forEach((symbol, x) => {
					if (typeof this.dictionary[symbol] === 'function') {
						const actor = new this.dictionary[symbol](new Vector (x,y));
						if (actor instanceof Actor) {
							arrayMovingObj.push(actor);
						}
					}
				});
			});
		}
		return arrayMovingObj;
	}

	parse(arrayString) {
		return new Level (this.createGrid(arrayString), this.createActors(arrayString));
	}
}

class Fireball extends Actor {
	constructor(pos = new Vector(0, 0), speed = new Vector(0, 0)) {
		super(pos, new Vector(1, 1), speed);
			Object.defineProperty(this, 'type', {
				value: 'fireball',
				writable: false,
				configurable: true,
				enumerable: true
			});
	}

	getNextPosition(time = 1) {
		return new Vector(this.pos.x + this.speed.x * time, this.pos.y + this.speed.y * time)
	}

	handleObstacle() {
		this.speed = new Vector(-this.speed.x, -this.speed.y);
	}

	act(time, window) {
		let pos = this.getNextPosition(time);
		let obj = window.obstacleAt(pos, this.size);
		if (obj) {
			this.handleObstacle();
			return;
		}
		this.pos = pos;
	}
}

class HorizontalFireball extends Fireball {
	constructor(pos = new Vector(), speed = new Vector(2,0)) {
		super(pos, speed);
	}
}

class VerticalFireball extends Fireball {
	constructor(pos = new Vector(), speed = new Vector(0,2)) {
		super(pos, speed);
	}
}

class FireRain extends Fireball {
	constructor(pos = new Vector(), speed = new Vector(0,3)) {
		super(pos, speed);
		this.beginningPos = pos;
	}

	handleObstacle() {
		this.pos = this.beginningPos;
	}
}

class Coin extends Actor {
	constructor(pos = new Vector()) {
		super(new Vector(pos.x + 0.2, pos.y + 0.1), new Vector(0.6, 0.6));
		Object.defineProperty(this, 'type', {
			get : () => 'coin'
		});
		this.springSpeed = 8;
		this.springDist = 0.07;
		this.spring = Math.random() * Math.PI * 2;
	}

	updateSpring(time = 1) {
		this.spring += this.springSpeed * time;
	}

	getSpringVector() {
		return new Vector(0, Math.sin(this.spring) * this.springDist);
	}

	getNextPosition(time) {
		this.updateSpring(time);
		return this.pos.plus(this.getSpringVector());
	}

	act(time) {
		this.pos = this.getNextPosition(time);
	}
}