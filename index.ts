// 1. pick random cell
// 2. for each direction
//     if next cell empty
//         push direction to cell
//         push reverse direction to next cell
//         repeat

// N S E W
// 1 0 0 0
// 0 1 0 0
// 0 0 1 0
// 0 0 0 1

import { shuffle } from 'underscore'

enum Directions {
    Up = 1,
    Down = 2,
    Right = 4,
    Left = 8,
}
const opposites : {[Directions:number]:Directions} = {
    [Directions.Up]: Directions.Down, [Directions.Down]: Directions.Up,
    [Directions.Right]: Directions.Left, [Directions.Left]: Directions.Right
}
const DY : {[Directions:number]:number} = {
    [Directions.Up]: -1, [Directions.Down]: 1,
    [Directions.Left]: 0, [Directions.Right]: 0,
}
const DX : {[Directions:number]:number} = {
    [Directions.Up]: 0, [Directions.Down]: 0,
    [Directions.Left]: -1, [Directions.Right]: 1,
}
const directions : Directions[] = [Directions.Up, Directions.Down, Directions.Right, Directions.Left]


const grid : number[][] = [
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
]

const generateMaze = (grid: number[][], x: number = 0, y: number = 0) : void => {
    const randomizedDirections:Directions[] = shuffle<number>(directions)

    for (let direction of randomizedDirections) {
        const nx:number = x + DX[direction],
              ny:number = y + DY[direction]

        if (isCellValid(grid, nx, ny)) {
            grid[y][x] |= direction
            grid[ny][nx] |= opposites[direction]

            generateMaze(grid, nx, ny)
        }
    }
    return
}

const isCellValid = (grid: number[][], x: number, y: number) : boolean => {
    const width: number = grid[0].length,
          height: number = grid.length

    if (
        (0 <= x) && (x < width) &&
        (0 <= y) && (y < height) &&
        (grid[y][x] == 0)
    ) {
        return true
    }

    return false
}

const printMaze = (grid: number[][]) : void => {
    let output: string = " "
    for (let i = 0; i < (grid.length * 2 - 1); i++) {
        output += "_"
    }
    console.log(output)

    for (let row of grid) {
        output = "|"

        for (let i = 0; i < row.length; i++) {
            const curr = row[i],
                next = row[i + 1]

            // if curr cell goes Down, print " ", else "_"
            output += (curr & Directions.Down) != 0 ? " " : "_"

            // if curr cell goes Right, no wall
            if ((curr & Directions.Right) != 0) {
                // if curr or next cell goes down, print space
                if (((curr | next) & Directions.Down) != 0) {
                    output += " "
                } else {
                    output += "_"
                }

            // else if curr cell doesn't go Right, wall
            } else {
                output += "|"
            }
        }
        console.log(output)
        output = ""
    }
}

generateMaze(grid)
console.log(grid)
printMaze(grid)