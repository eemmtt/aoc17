import { parseTextToString } from "../input/utils";

const path = "./input/d5.txt";
const input = parseTextToString(path).split("\n").map(Number);
//console.log(input);

function complexJumper(instructions: number[]){
    let cursor = 0;
    let count = 0;
    let escaped = false;

    while (!escaped){
        const jump = instructions[cursor];
        instructions[cursor] += jump >= 3 ? -1 : 1;
        count += 1;
        cursor += jump;
        if (cursor < 0 || cursor >= instructions.length){
            escaped = true;
        }
    }
    return count;
}

console.log(complexJumper(input));
