import { parseTextToString } from "../input/utils";

const path = "./input/d2.txt";
const inputRows = parseTextToString(path).split("\n").slice(0,-1);
//console.log(inputRows);

const input: number[][] = [];
inputRows.forEach((row) => {
    input.push(row.split("\t").map(Number));
})
//console.log(input);

function calcCheckSum(input: number [][]): number{
    //checksum is the sum of the differences of the min and max values of each row
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let max = Number.NEGATIVE_INFINITY;
        let min = Number.POSITIVE_INFINITY;
        for (let j = 0; j < input[i].length; j++) {
            max = Math.max(input[i][j], max);
            min = Math.min(input[i][j], min);
        }      
        sum += max - min;  
    }

    return sum;
}

const tests = [
    {input: [[5,1,9,5], [7,5,3], [2,4,6,8]], answer: 18},
]

tests.forEach((test) => {
    console.log("Test input:", test.input,"\nTest answer:",test.answer,"\nCalc'd answer:", calcCheckSum(test.input));
})

console.log("Result of input:", calcCheckSum(input));