import { parseTextToString } from "../input/utils";

interface Pair{
    a: number,
    b: number,
    result: number
}

const path = "./input/d2.txt";
const inputRows = parseTextToString(path).split("\n").slice(0,-1);
//console.log(inputRows);

const input: number[][] = [];
inputRows.forEach((row) => {
    input.push(row.split("\t").map(Number));
})
//console.log(input);

function calcCheckSum(input: number [][]): number{
    //checksum is the sum of the pair of evenly divisible values of each row (1 per row)
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let pair = findEvenlyDivisiblePair(input[i]);
        console.log(pair);

        if (pair){
            sum += pair.result;
        }
    }

    return sum;
}

function findEvenlyDivisiblePair(row: number[]): Pair | null{
    for (let i = 0; i < row.length - 1; i++) {
        const a = row[i];
        for (let k = i+1; k < row.length; k++){
            const b = row[k];
            //console.log("i,k:", i, k, "a,b:", a, b);
            if (a  % b == 0) {
                return {a: a, b: b, result: a / b};
            }

            if (b % a == 0) {
                return {a: a, b: b, result: b / a};
            }
        }
    }  

    console.log("findEvenlyDivisiblePair() found no evenly divisible pair in", row);
    return null;

}

const tests = [
    {input: [[5,9,2,8], [9,4,7,3], [3,8,6,5]], answer: 9},
]

tests.forEach((test) => {
    console.log("Test input:", test.input,"\nTest answer:",test.answer,"\nCalc'd answer:", calcCheckSum(test.input));
})

console.log("Result of input:", calcCheckSum(input));