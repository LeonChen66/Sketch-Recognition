// Put code for your features in this file. The extractFeatures function should return an array of your feature values as outlined in the instructions.

// This is how many arrows and non-arrows will be processed. A value of 10 will calculate features for 10 arrows and 10 non-arrows.
// A value of 0 will calculate features for all arrows and non-arrows in the dataset.
exports.sketchCount = 500;

// Name of the output file
exports.outputFile = './features.csv';

/**
 * DO NOT MODIFY THE FUNCTION NAME
 *
 * Takes in a stroke and returns an array of feature values
 * A stroke is an array of Points. A point has properties x, y, and time (in ms since epoch).
 *
 * The returned features should be an array of at least length 30.
 * The first 13 values are Rubine's 13 features in number order.
 * The next 11 values are Long's features 12-22 in his paper.
 * The remaining values are your own features.
 */
exports.extractFeatures = function(stroke) {
    var x_array = [];
    var y_array = [];
    var time_array = [];
    for (i = 0; i < stroke.length; i++) {
        x_array.push(stroke[i]['x']);
        y_array.push(stroke[i]['y']);
        time_array.push(stroke[i]['time']);
    }
     return [ // You should change this default return to your 30+ features
        f1(stroke),
        f2(stroke),
        f3(stroke),
        f4(stroke, x_array, y_array, time_array),
        f5(stroke, x_array, y_array, time_array),
        f6(stroke, x_array, y_array, time_array),
        f7(stroke, x_array, y_array, time_array),
        f8(stroke, x_array, y_array, time_array),
        f9(stroke, x_array, y_array, time_array),
        f10(stroke, x_array, y_array, time_array),
        f11(stroke, x_array, y_array, time_array),
        f12(stroke, x_array, y_array, time_array),
        f13(stroke, x_array, y_array, time_array),
        f14(stroke, x_array, y_array, time_array),
        f15(stroke, x_array, y_array, time_array),
        f16(stroke, x_array, y_array, time_array),
        f17(stroke, x_array, y_array, time_array),
        f18(stroke, x_array, y_array, time_array),
        f19(stroke, x_array, y_array, time_array),
        f20(stroke, x_array, y_array, time_array),
        f21(stroke, x_array, y_array, time_array),
        f22(stroke, x_array, y_array, time_array),
        f23(stroke, x_array, y_array, time_array),
        f24(stroke, x_array, y_array, time_array),
        f25(stroke, x_array, y_array, time_array),
        f26(stroke, x_array, y_array, time_array),
        f27(stroke, x_array, y_array, time_array),
        f28(stroke, x_array, y_array, time_array),
        f29(stroke, x_array, y_array, time_array),
        f30(stroke, x_array, y_array, time_array),
    ];
};

// Example of how you may break out features into separate functions to make the code cleaner
// cos
function f1(stroke) {
    var x1 = stroke[0]['x'];
    var y1 = stroke[0]['y'];
    var x2 = stroke[2]['x'];
    var y2 = stroke[2]['y'];
    var x_delta = x2-x1;
    var y_delta = y2-y1;
    var cosine = x_delta / Math.sqrt(Math.pow(x_delta,2) + Math.pow(y_delta,2));
    return cosine;
}
// sin
function f2(stroke) {
    var x1 = stroke[0]['x'];
    var y1 = stroke[0]['y'];
    var x2 = stroke[2]['x'];
    var y2 = stroke[2]['y'];
    var x_delta = x2 - x1;
    var y_delta = y2 - y1;
    if (x_delta!=0 && y_delta!=0){
        var sine = y_delta / Math.sqrt(Math.pow(x_delta, 2) + Math.pow(y_delta, 2));
    } else {
        var sine = 0;
    }
    return sine;
}

function f3(stroke) {
    var x_array = [];
    var y_array = [];
    var time_array = [];
    for (i=0;i<stroke.length;i++){
        x_array.push(stroke[i]['x']);
        y_array.push(stroke[i]['y']);
        time_array.push(stroke[i]['time']);
    }
    var x_max = Math.max.apply(Math, x_array);
    var x_min = Math.min.apply(Math, x_array);;
    var y_max = Math.max.apply(Math, y_array);
    var y_min = Math.min.apply(Math, y_array);
    // console.log(Math.max(x_array))
    var f3_length = Math.sqrt(Math.pow(x_max-x_min, 2) + Math.pow(y_max-y_min, 2));
    return f3_length;
}

function f4(stroke, x_array, y_array, time_array) {
    var x_max = Math.max.apply(Math, x_array);
    var x_min = Math.min.apply(Math, x_array);;
    var y_max = Math.max.apply(Math, y_array);
    var y_min = Math.min.apply(Math, y_array);
    return Math.atan((y_max-y_min)/(x_max-x_min));
}

function f5(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var x_p = x_array[x_array.length-1];
    var y_0 = y_array[0];
    var y_p = y_array[y_array.length-1];
    return Math.sqrt(Math.pow(x_p - x_0, 2) + Math.pow(y_p - y_0, 2));
}

function f6(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var x_p = x_array[x_array.length - 1];
    var y_0 = y_array[0];
    var y_p = y_array[y_array.length - 1];
    return (x_p-x_0) / Math.sqrt(Math.pow(x_p - x_0, 2) + Math.pow(y_p - y_0, 2));
}

function f7(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var x_p = x_array[x_array.length - 1];
    var y_0 = y_array[0];
    var y_p = y_array[y_array.length - 1];
    return (y_p - y_0) / Math.sqrt(Math.pow(x_p - x_0, 2) + Math.pow(y_p - y_0, 2));
}

function f8(stroke, x_array, y_array, time_array) {
    var total_gesture_length = 0;

    for(i=1;i<x_array.length;i++){
        total_gesture_length += Math.sqrt(Math.pow(x_array[i] - x_array[i-1], 2) + Math.pow(y_array[i] - y_array[i-1], 2));
    }
    return total_gesture_length;
}   

function f9(stroke, x_array, y_array, time_array) {
    var total_angle = 0;
    for (i = 1; i < x_array.length; i++) {
        x_p = x_array[i];
        x_pp = x_array[i-1];
        y_p = y_array[i];
        y_pp = y_array[i-1];
        total_angle += Math.atan((x_p*y_pp-x_pp*y_p)/(x_p*x_pp+y_p*y_pp));
    }
    return total_angle;

}

function f10(stroke, x_array, y_array, time_array) {
    var total_angle_abs = 0;
    for (i = 1; i < x_array.length; i++) {
        x_p = x_array[i];
        x_pp = x_array[i - 1];
        y_p = y_array[i];
        y_pp = y_array[i - 1];
        total_angle_abs += Math.abs(Math.atan((x_p * y_pp - x_pp * y_p) / (x_p * x_pp + y_p * y_pp)));
    }
    return total_angle_abs;
}

function f11(stroke, x_array, y_array, time_array) {
    var total_angle_pow = 0;
    for (i = 1; i < x_array.length; i++) {
        x_p = x_array[i];
        x_pp = x_array[i - 1];
        y_p = y_array[i];
        y_pp = y_array[i - 1];
        total_angle_pow += Math.pow(Math.atan((x_p * y_pp - x_pp * y_p) / (x_p * x_pp + y_p * y_pp)), 2);
    }
    return total_angle_pow;
}

function f12(stroke, x_array, y_array, time_array) {
    var max_speed = 0
    for (i=1;i<x_array.length;i++){
        x_delta = x_array[i] - x_array[i-1];
        y_delta = y_array[i] - y_array[i - 1];
        time_delta = time_array[i] - time_array[i - 1];
        tmp_speed = (x_delta*x_delta + y_delta*y_delta) / (time_delta*time_delta);
        if(time_delta!=0){
            max_speed = Math.max(max_speed, tmp_speed);
        }
    }
    return max_speed
}

function f13(stroke, x_array, y_array, time_array) {
    return time_array[time_array.length-1] - time_array[0];
}
// Aspect 
function f14(stroke, x_array, y_array, time_array) {
    return Math.abs(f4(stroke, x_array, y_array, time_array)*180/Math.PI);
}
// Curviness

function f15(stroke, x_array, y_array, time_array) {
    var total_angle_abs = 0;
    for (i = 1; i < x_array.length; i++) {
        x_p = x_array[i];
        x_pp = x_array[i - 1];
        y_p = y_array[i];
        y_pp = y_array[i - 1];
        total_angle_abs += Math.abs(Math.atan((x_p * y_pp - x_pp * y_p) / (x_p * x_pp + y_p * y_pp)));
    }
    return total_angle_abs;
}
// Total angle traversed / total length
function f16(stroke, x_array, y_array, time_array) {
    return f9(stroke, x_array, y_array, time_array) / f8(stroke, x_array, y_array, time_array);
}
// Density Metric 1
function f17(stroke, x_array, y_array, time_array) {
    return f8(stroke, x_array, y_array, time_array) / f5(stroke, x_array, y_array, time_array);
}
// Density Metric 2
function f18(stroke, x_array, y_array, time_array) {
    return f8(stroke, x_array, y_array, time_array) / f3(stroke, x_array, y_array, time_array);
}
// No subjective openness
function f19(stroke, x_array, y_array, time_array) {
    return f5(stroke, x_array, y_array, time_array) / f3(stroke, x_array, y_array, time_array);
}
// Area of bounding box
function f20(stroke, x_array, y_array, time_array) {
    var x_max = Math.max.apply(Math, x_array);
    var x_min = Math.min.apply(Math, x_array);
    var y_max = Math.max.apply(Math, y_array);
    var y_min = Math.min.apply(Math, y_array);
    return (y_max-y_min) * (x_max-x_min);
}
// Log Area
function f21(stroke, x_array, y_array, time_array) {
    return Math.log(f20(stroke, x_array, y_array, time_array));
}
// total angle / total absolute angle
function f22(stroke, x_array, y_array, time_array) {
    return f9(stroke, x_array, y_array, time_array) / f10(stroke, x_array, y_array, time_array);
}
// Log total length
function f23(stroke, x_array, y_array, time_array) {
    return Math.log(f8(stroke, x_array, y_array, time_array));
}
// Log (aspect)
function f24(stroke, x_array, y_array, time_array) {
    return Math.log(f14(stroke, x_array, y_array, time_array));
}
// Average Speed
function f25(stroke, x_array, y_array, time_array) {
    return f8(stroke, x_array, y_array, time_array) / (time_array[time_array.length-1]-time_array[0]);
}
// Stroke length divied by initial to Centroid point
function f26(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var y_0 = y_array[0];
    var dis_cen = Math.sqrt((x_0 * x_0)+(y_0*y_0));
    return f8(stroke, x_array, y_array, time_array) / dis_cen;
}
// Diagonal Length divided by initial to Centroid point
function f27(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var y_0 = y_array[0];
    var dis_cen = Math.sqrt((x_0 * x_0) + (y_0 * y_0));
    return f3(stroke, x_array, y_array, time_array) / dis_cen;
}
// initial to Centroid point distance
function f28(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var y_0 = y_array[0];
    var dis_cen = Math.sqrt((x_0 * x_0) + (y_0 * y_0));
    return dis_cen;
}
// Velocity
function f29(stroke, x_array, y_array, time_array) {
    var x_0 = x_array[0];
    var x_p = x_array[x_array.length - 1];
    var y_0 = y_array[0];
    var y_p = y_array[y_array.length - 1];
    var t_0 = time_array[0];
    var t_p = time_array[time_array.length - 1];
    return Math.sqrt(Math.pow(x_p - x_0, 2) + Math.pow(y_p - y_0, 2)) / (t_p-t_0)
}
// Number of sketch
function f30(stroke, x_array, y_array, time_array) {
    return time_array.length
}

