import { parseTextToString } from "../input/utils";

const path = "./input/d1.txt";
//split string, convert into numbers and remove terminating 0 left over from string
const input = parseTextToString(path).split("").map(Number).slice(0, -1); 
//console.log(input)

function sumNextMatch(input: number[]): number {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const curr = input[i];
        const next = input[(i + 1) % input.length];
    
        //if current number same as next number, add to sum
        sum += curr == next ? curr: 0;
    }
    return sum;
}

/*
const testInput = [
    [1,1,2,2],
    [1,1,1,1],
    [1,2,3,4],
    [9,1,2,1,2,1,2,9],
]

testInput.forEach((test) => {
    console.log(test, sumNextMatch(test));
});
*/

console.log(sumNextMatch(input));
