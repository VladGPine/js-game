'use strict';

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    plus (vectorObj) {
        try {
            if (vectorObj instanceof Vector) {
                throw 'Можно прибавлять к вектору только вектор типа Vector';
            } 
        } catch (e) {
            console.log(e);
        }
        let vector = new Vector();
        vector.x += this.x;
        vector.y += this.y;
        return vector;
    }

    times (multiplier) {
        let vector = new Vector(this.x * multiplier, this.y * multiplier);
        return vector;
    }
}





// const grid = [
//   new Array(3),
//   ['wall', 'wall', 'lava']
// ];
// const level = new Level(grid);
// runLevel(level, DOMDisplay);

// const schema = [
//   '         ',
//   '         ',
//   '         ',
//   '         ',
//   '     !xxx',
//   '         ',
//   'xxx!     ',
//   '         '
// ];
// const parser = new LevelParser();
// const level = parser.parse(schema);
// runLevel(level, DOMDisplay);

// const schema = [
//   '         ',
//   '         ',
//   '         ',
//   '         ',
//   '     !xxx',
//   ' @       ',
//   'xxx!     ',
//   '         '
// ];
// const actorDict = {
//   '@': Player
// }
// const parser = new LevelParser(actorDict);
// const level = parser.parse(schema);
// runLevel(level, DOMDisplay);

// const schema = [
//   '         ',
//   '         ',
//   '    =    ',
//   '         ',
//   '     !xxx',
//   ' @       ',
//   'xxx!     ',
//   '         '
// ];
// const actorDict = {
//   '@': Player,
//   '=': HorizontalFireball
// }
// const parser = new LevelParser(actorDict);
// const level = parser.parse(schema);
// DOMDisplay(document.body, level);

// const schema = [
//   '         ',
//   '         ',
//   '    =    ',
//   '       o ',
//   '     !xxx',
//   ' @       ',
//   'xxx!     ',
//   '         '
// ];
// const actorDict = {
//   '@': Player,
//   '=': HorizontalFireball
// }
// const parser = new LevelParser(actorDict);
// const level = parser.parse(schema);
// runLevel(level, DOMDisplay)
//   .then(status => console.log(`Игрок ${status}`));

// const schemas = [
//   [
//     '         ',
//     '         ',
//     '    =    ',
//     '       o ',
//     '     !xxx',
//     ' @       ',
//     'xxx!     ',
//     '         '
//   ],
//   [
//     '      v  ',
//     '    v    ',
//     '  v      ',
//     '        o',
//     '        x',
//     '@   x    ',
//     'x        ',
//     '         '
//   ]
// ];
// const actorDict = {
//   '@': Player,
//   'v': FireRain
// }
// const parser = new LevelParser(actorDict);
// runGame(schemas, parser, DOMDisplay)
//   .then(() => console.log('Вы выиграли приз!'));