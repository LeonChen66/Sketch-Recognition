const readline = require('readline');
const fs = require('fs');
const os = require('os');
const inputFile = './input.json';

const hmm = require('./hmm');

// This will create the readStream, readLine interface, and readLine event handlers for the given fileName
// Returns the readLine object
function processFile(fileName) {
    const readStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: readStream
    });

    rl.on('line', line => {
        let data = JSON.parse(line);
        if (!data) return;
        let output = hmm.hmm(data.states, data.emissions, data.start_probabilities, data.transition_probabilities, data.emission_probabilities, data.direction, data.observations);
        console.log(`Input states: [${data.states.join(',')}]`);
        console.log(`Input observations: [${data.observations.join(',')}]`);
        console.log(`Direction: ${data.direction}`);
        console.log();
        console.log('Outputs:');
        printOutput(output);
        console.log();
    });

    rl.on('close', () => {
        console.log('Processed all models');
    });

    return rl;
}

function printOutput(output) {
    for (let i = 0; i < output.length; i++) {
        console.log(output[i].join(','));
    }
}

processFile(inputFile);
