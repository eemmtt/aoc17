import { parseTextToString } from "../input/utils";

const path = "./input/d4.txt";
const inputRows = parseTextToString(path).split("\n");
//console.log(inputRows);

const input: string[][] = [];
inputRows.forEach((row) => {
    input.push(row.split(" "));
})
//console.log(input);


function hasNoDuplicates(passphrase: string[]): boolean {
    const seen = new Set();
    for (let i = 0; i < passphrase.length; i++){
        const phrase = passphrase[i];
        if (seen.has(phrase)){
            return false;
        } else {
            seen.add(phrase);
        } 
    }
    return true;
}

const numValidPassphrases = input.reduce((acc, row) => {
    if (hasNoDuplicates(row)){
        return acc + 1;
    }
    return acc;
}, 0);

console.log("Number of valid passphrases:", numValidPassphrases);