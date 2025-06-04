import { parseTextToString } from "../input/utils";

const path = "./input/d3.txt";
const input = parseInt(parseTextToString(path));
console.log(input);

function nToPoint(n: number){
    // given coordinate n on spiral, return cartesian coordinate
    // origin at 0,0 n=1 then 1,0 n=2, proceeding CCW...
    console.log("nToPoint(", n, "):");

    // step across spiral until we locate the ring containing n
    // this could be calculated in O(1) with some algebra...
    let ring = 0;
    let agg = 1;
    while (agg + ring * 8 < n){
        agg += ring * 8;
        ring += 1;
    }
    console.log("ring:",ring, "agg:",agg);

    // calculate which side of the ring n is on
    // the domain of dist is (0,1,2,3,4]
    // dist = {1,2,3,4} are the corners of the ring
    const dist = 4 * (n - agg) / (ring * 8);
    const corner = Math.ceil(dist);
    const offset = dist % 1 == 0 ? 0 : 1 - (dist % 1); // if n is on a corner: no offset, otherwise its inverted
    console.log("dist:",dist, "corner:", corner, "offset:", offset);

    const corners: Record<number, {x: number, y: number}> = {
        1: {x: 1, y: 1},
        2: {x: -1, y: 1},
        3: {x: -1, y: -1},
        4: {x: 1, y: -1}
    };
    const cornerPos = {
        x: corners[corner].x * ring, 
        y: corners[corner].y * ring
    };

    const edgeLength = (ring * 8) / 4;
    const offsetDir: Record<number, {x: number, y: number}> = {
        1: {x: 0, y: -1},
        2: {x: 1, y: 0},
        3: {x: 0, y: 1},
        4: {x: -1, y: 0}
    };
    const offsetPos = {
        x: offsetDir[corner].x * offset * edgeLength,
        y: offsetDir[corner].y * offset * edgeLength
    }

    const pos = {
        x: cornerPos.x + offsetPos.x,
        y: cornerPos.y + offsetPos.y,
    }
    
    console.log("position: (", pos.x, ",", pos.y, ")");
    console.log("Total steps required:", Math.abs(pos.x) + Math.abs(pos.y), "\n");
}

nToPoint(input);
