// 1. pick random cell
// 2. for each direction
//     if next cell empty
//         push direction to cell
//         push reverse direction to next cell
//         repeat
"use strict";
exports.__esModule = true;
// N S E W
// 1 0 0 0
// 0 1 0 0
// 0 0 1 0
// 0 0 0 1
var underscore_1 = require("underscore");
var Directions;
(function (Directions) {
    Directions[Directions["Up"] = 1] = "Up";
    Directions[Directions["Down"] = 2] = "Down";
    Directions[Directions["Right"] = 4] = "Right";
    Directions[Directions["Left"] = 8] = "Left";
})(Directions || (Directions = {}));
var opposites = (_a = {},
    _a[Directions.Up] = Directions.Down,
    _a[Directions.Down] = Directions.Up,
    _a[Directions.Right] = Directions.Left,
    _a[Directions.Left] = Directions.Right,
    _a);
var DY = (_b = {},
    _b[Directions.Up] = -1,
    _b[Directions.Down] = 1,
    _b[Directions.Left] = 0,
    _b[Directions.Right] = 0,
    _b);
var DX = (_c = {},
    _c[Directions.Up] = 0,
    _c[Directions.Down] = 0,
    _c[Directions.Left] = -1,
    _c[Directions.Right] = 1,
    _c);
var directions = [Directions.Up, Directions.Down, Directions.Right, Directions.Left];
var grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var generateMaze = function (grid, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    var randomizedDirections = underscore_1.shuffle(directions);
    for (var _i = 0, randomizedDirections_1 = randomizedDirections; _i < randomizedDirections_1.length; _i++) {
        var direction = randomizedDirections_1[_i];
        var nx = x + DX[direction], ny = y + DY[direction];
        if (isCellValid(grid, nx, ny)) {
            grid[y][x] |= direction;
            grid[ny][nx] |= opposites[direction];
            generateMaze(grid, nx, ny);
        }
    }
    return;
};
var isCellValid = function (grid, x, y) {
    var width = grid[0].length, height = grid.length;
    if ((0 <= x) && (x < width) &&
        (0 <= y) && (y < height) &&
        (grid[y][x] == 0)) {
        return true;
    }
    return false;
};
var printMaze = function (grid) {
    var output = " ";
    for (var i = 0; i < (grid.length * 2 - 1); i++) {
        output += "_";
    }
    console.log(output);
    for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
        var row = grid_1[_i];
        output = "|";
        for (var i = 0; i < row.length; i++) {
            var curr = row[i], next = row[i + 1];
            // if curr cell goes Down, print " ", else "_"
            output += (curr & Directions.Down) != 0 ? " " : "_";
            // if curr cell goes Right, no wall
            if ((curr & Directions.Right) != 0) {
                // if curr or next cell goes down, print space
                if (((curr | next) & Directions.Down) != 0) {
                    output += " ";
                }
                else {
                    output += "_";
                }
                // else if curr cell doesn't go Right, wall
            }
            else {
                output += "|";
            }
        }
        console.log(output);
        output = "";
    }
};
generateMaze(grid);
console.log(grid);
printMaze(grid);
var _a, _b, _c;
