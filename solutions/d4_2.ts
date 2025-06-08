import { parseTextToString } from "../input/utils";

const path = "./input/d4.txt";
const inputRows = parseTextToString(path).split("\n");
//console.log(inputRows);

const input: string[][] = [];
inputRows.forEach((row) => {
    input.push(row.split(" "));
})
//console.log(input);

function countChars(phrase: string): string {
    const charCountArray = new Array(26).fill(0);
    for (let i = 0; i < phrase.length; i++){
        charCountArray[phrase.charCodeAt(i) - 97] += 1; //ascii a - z : 97 - 122
    }
    return charCountArray.toString();
}

function hasNoAnagrams(passphrase: string[]): boolean{
    const memo = new Set();
    for (let i = 0; i < passphrase.length; i++) {
        const charCount = countChars(passphrase[i]);
        if (memo.has(charCount)){
            return false;
        } else {
            memo.add(charCount);
        }
    }
    return true;
}

const numValidPassphrases = input.reduce((acc, row) => {
    if (hasNoAnagrams(row)){
        return acc + 1;
    }
    return acc;
}, 0);

console.log("Number of valid passphrases:", numValidPassphrases);