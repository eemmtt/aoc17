import { parseTextToString } from "../input/utils";

const path = "./input/d3.txt";
const input = parseInt(parseTextToString(path));
console.log(input);

interface ValuedPt{
    x: number, 
    y: number
    value: number
}

class ValuedPtMap{
    map: Map<string,number>;
    constructor(){
        this.map = new Map();
    }
    push(vPt: ValuedPt){
        const key = `${vPt.x},${vPt.y}`;
        this.map.set(key, vPt.value);
    }
    get(x: number, y: number){
        const key = `${x},${y}`;
        return this.map.get(key);
    }
}

function sumNeighbors(map: ValuedPtMap, pt: {x: number, y: number}){
    const dirs = [
        {x: 1, y: 0}, 
        {x: 1, y: 1}, 
        {x: 0, y: 1}, 
        {x: -1, y: 1}, 
        {x: -1, y: 0}, 
        {x: -1, y: -1}, 
        {x: 0, y: -1}, 
        {x: 1, y: -1}
    ];

    let sum = 0;
    for (let i = 0; i < dirs.length; i++) {
        const neighborValue = map.get(pt.x + dirs[i].x, pt.y + dirs[i].y);
        if (neighborValue){
            sum += neighborValue;
        }
    }
    return sum;
}

function addDir(dir: {x: number, y: number}){
    return (pt: {x: number, y: number}) => {
        return {
            x: pt.x + dir.x, y: pt.y + dir.y
        }
    }
}

function* nextDir(){
    const goNorth = addDir({x:0, y: 1});
    const goWest = addDir({x:-1, y: 0});
    const goSouth = addDir({x:0, y: -1});
    const goEast = addDir({x:1, y: 0});

    while (true){
        yield goNorth;
        yield goWest;
        yield goSouth;
        yield goEast;
    }
}

function* spiralWalk(){
    const map = new ValuedPtMap();
    const mover = nextDir();
  
    //start
    let pos = {x:0, y:0};
    let sum = 1;
    map.push({x: pos.x, y: pos.y, value: sum})
    yield {
        pos: pos, 
        sum: sum
    };
    
    //first step right
    pos = {x:1, y:0};
    sum = sumNeighbors(map, pos);
    map.push({x: pos.x, y: pos.y, value: sum})
    yield {
        pos: pos, 
        sum: sum
    };

    //first step north
    let move = mover.next().value!;
    pos = move(pos);
    sum = sumNeighbors(map, pos);
    map.push({x: pos.x, y: pos.y, value: sum})
    yield {
        pos: pos, 
        sum: sum
    };    

    //the idea is that you walk the same number of steps along 2 edges of the spiral
    //before you need to increment the number of steps to maintain the pattern
    //first you zig, then you zag
    let steps = 2;
    while (true){
        move = mover.next().value!;
        for (let zig = 0; zig < steps; zig++) {
            pos = move(pos);
            sum = sumNeighbors(map, pos);
            map.push({x: pos.x, y: pos.y, value: sum})
            yield {
                pos: pos, 
                sum: sum
            };
        }

        move = mover.next().value!;
        for (let zag = 0; zag < steps; zag++) {
            pos = move(pos);
            sum = sumNeighbors(map, pos);
            map.push({x: pos.x, y: pos.y, value: sum})
            yield {
                pos: pos, 
                sum: sum
            };        
        }

        steps += 1;
    }
}


const spiralWalker = spiralWalk();
let depth = 0; //guard rail
while (true){
    const walk = spiralWalker.next().value!;
    if (walk.sum > input || depth > 100000){
        console.log(walk.sum);
        break;
    }
    depth += 1;
}