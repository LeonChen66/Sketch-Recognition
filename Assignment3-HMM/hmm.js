/**
 * DO NOT MODIFY THE FUNCTION NAME
 *
 * Takes in the values for a HMM
 * Returns a nested array of the most likely states after each observation
 *
 * For 3 observations, there should be 3 elements in the returned array. Each element will be an array with length 1, 2, 3 respectively.
 */
exports.hmm = function(states, emissions, startProbabilities, transitionProbabilities, emissionProbabilities, direction, observations) {
    let output = [];
    if(direction=='backward'){
        observations = observations.reverse();
        let T = observations.length;
        let N = Object.keys(transitionProbabilities).length;
        let alpha = [];
        let state_results = [];
        for (var i = 0; i < N; i++) {
            state_results[i] = [];
            alpha[i] = [];
            alpha[0][i] = emissionProbabilities[states[i]][observations[0]];
            state_results[0][i] = i.toString();
        };
        // Recursion[states[l]]
        for (var i = 1; i < T; i++) {
            if (i==T-1){
                alpha[i] = [];
                state_results[i] = [];
                for (var j = 0; j < N; j++) {
                    var state_arr = [];
                    for (var l = 0; l < N; l++) {
                        state_arr.push(startProbabilities[states[j]] * alpha[i - 1][l] * transitionProbabilities[states[j]][states[l]] * emissionProbabilities[states[j]][observations[i]]);
                    }
                    let index = state_arr.indexOf(Math.max.apply(Math, state_arr));
                    state_results[i][j] = state_results[i - 1][index] + j.toString();
                    alpha[i][j] = Math.max.apply(Math, state_arr);
                }
            }else{
                alpha[i] = [];
                state_results[i] = [];
                for (var j = 0; j < N; j++) {
                    var state_arr = [];
                    for (var l = 0; l < N; l++) {
                        state_arr.push(alpha[i - 1][l] * transitionProbabilities[states[j]][states[l]] * emissionProbabilities[states[j]][observations[i]]);
                    }
                    let index = state_arr.indexOf(Math.max.apply(Math, state_arr));
                    state_results[i][j] = state_results[i - 1][index] + j.toString();
                    alpha[i][j] = Math.max.apply(Math, state_arr);
                }
            }
        }
        for (var i = 0; i < T; i++) {
            output[i] = []
            let index = alpha[i].indexOf(Math.max.apply(Math, alpha[i]));
            for (var j = 0; j < state_results[i][index].length; j++) {
                output[i].push(states[parseInt(state_results[i][index].charAt(j))]);
            }
            output[i] = output[i].reverse();
        };
    } else {
        let T = observations.length;
        let N = Object.keys(transitionProbabilities).length;
        let alpha = [];
        let state_results = [];
        for (var i = 0; i < N; i++) {
            state_results[i] = [];
            alpha[i] = [];
            alpha[0][i] = startProbabilities[states[i]] * emissionProbabilities[states[i]][observations[0]];
            state_results[0][i] = i.toString();
        };
        // Recursion
        for (var i = 1; i < T; i++) {
            alpha[i] = [];
            state_results[i] = [];
            for (var j = 0; j < N; j++) {
                var state_arr = [];
                for (var l = 0; l < N; l++) {
                    state_arr.push(alpha[i - 1][l] * transitionProbabilities[states[l]][states[j]] * emissionProbabilities[states[j]][observations[i]]);
                }
                let index = state_arr.indexOf(Math.max.apply(Math, state_arr));
                state_results[i][j] = state_results[i - 1][index] + j.toString();
                alpha[i][j] = Math.max.apply(Math, state_arr);
            }
        }
        for (var i = 0; i < T; i++) {
            output[i] = []
            let index = alpha[i].indexOf(Math.max.apply(Math, alpha[i]));
            for (var j = 0; j < state_results[i][index].length; j++) {
                output[i].push(states[parseInt(state_results[i][index].charAt(j))]);
            }
        };
    };
    
    return output;
};
