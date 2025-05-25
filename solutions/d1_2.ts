import { parseTextToString } from "../input/utils";

const path = "./input/d1.txt";
//split string, convert into numbers and remove terminating 0 left over from string
const input = parseTextToString(path).split("").map(Number).slice(0, -1); 
//console.log(input)

function sumHalfCircMatch(input: number[]): number {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const curr = input[i];
        const next = input[(i + Math.floor(input.length * 0.5)) % input.length];
    
        //if current number same as next number, add to sum
        sum += curr == next ? curr: 0;
    }
    return sum;
}



const testInput = [
    {input: [1,2,1,2], answer: 6},
    {input: [1,2,2,1], answer: 0},
    {input: [1,2,3,4,2,5], answer: 4},
    {input: [1,2,3,1,2,3], answer: 12},
    {input: [1,2,1,3,1,4,1,5], answer: 4},
]

testInput.forEach((test) => {
    console.log(test.input, test.answer, sumHalfCircMatch(test.input));
});


console.log(sumHalfCircMatch(input));
