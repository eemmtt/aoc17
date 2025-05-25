import * as fs from 'fs';
import * as path from 'path';

export function parseTextToString(filePath: string): string {
    try {
        const absolutePath = path.resolve(filePath);
        const fileContents = fs.readFileSync(absolutePath, 'utf-8');
        return fileContents;
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        return '';
    }
}