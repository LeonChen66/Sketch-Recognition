/**
 * DO NOT MODIFY THE FUNCTION NAME
 *
 * Takes in a stroke and returns a list of substrokes
 * A stroke is just an array of points. A point has properties x, y, and time (in ms since epoch).
 * A substroke is also a list of points, just like a stroke
 */
export function segment(stroke) {
    // Direction difference
    let seg = [[stroke[0], stroke[1]]];
    // let seg = [];
    let i = 0;
    let j = 0;
    let thres = 0.5;
    for (i = 1; i < stroke.length - 1; i++) {
        // var tmp = [stroke[i]];
        var delta_xp0 = stroke[i].x - stroke[i - 1].x;
        var delta_yp0 = stroke[i].y - stroke[i - 1].y;
        var delta_xp1 = stroke[i + 1].x - stroke[i].x;
        var delta_yp1 = stroke[i+1].y - stroke[i].y;
        var curve = Math.atan((delta_xp1 * delta_yp0 - delta_xp0 * delta_yp1)/(delta_xp0*delta_xp1 + delta_yp1 * delta_yp0));
        if (Math.abs(curve) > thres) {
            seg.push([]);
            j++;
        };
        // seg[j-1].push(stroke[i-1]);
        // seg[j-1].push(stroke[i]);
        seg[j].push(stroke[i]);
        seg[j].push(stroke[i+1]);
        // seg[j].push(stroke[i + 1]);
        };
        // return [stroke]; // This is a dumb segmenter that just says the stroke is a single segment so it returns an array of 1 substroke (the original stroke)
        // let i = 0;
        // let j = 0;
        // let thres = 10; 
        return seg;
        // return [stroke];
    };