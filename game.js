'use strict';

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    plus (vectorObj) {
        if (!(vectorObj instanceof Vector)) throw new Error('Можно прибавлять к вектору только вектор типа Vector'); 
        let vector = new Vector(this.x + vectorObj.x, this.y + vectorObj.y);
        // console.log(vector);
        return vector;
    }

    times (multiplier) {
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
        Object.defineProperty(this, 'type', {
            value: 'actor',
            writable: false,
            configurable: false,
            enumerable: true
        });
    }

    act () {

    }
}