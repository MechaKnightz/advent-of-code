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

    const invalidNumber = 10884537;

    for (let i = 25; i < intArray.length; i++) {
        let currentSet = [];
        let match = false;
        let value = 0;
        for (let j = i; j < intArray.length; j++) {
            value += intArray[j];
            
            currentSet.push(intArray[j]);

            if(value == invalidNumber) {
                match = true;
                break;
            }
            else if(value > invalidNumber)
                break;
        }

        if (match) {
            answer = Math.min(...currentSet) + Math.max(...currentSet);
            break;
        }
    }

    console.log(answer);
});