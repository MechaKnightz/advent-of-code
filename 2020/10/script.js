const { match } = require('assert');
const { parse } = require('path');

fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var dataArray = data.split("\n");
    var answer = 0;
    var intArray = dataArray.map(x => {
        return parseInt(x);
    });

    for (let i = 25; i < intArray.length; i++) {
        let value = intArray[i];
        let match = false;
        for (let j = i - 25; j < i; j++) {
            for (let k = j + 1; k < i; k++) {
                if (intArray[j] + intArray[k] == value)
                    match = true;
            }
        }
        if (!match) {
            answer = value;
            break;
        }
    }

    console.log(answer);
});