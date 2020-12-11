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

    let lines = dataArray.map(element => {
        return { instruction: element.match(/.*(?= )/g)[0], value: parseInt(element.match(/(?= ).*/g)[0]) }
    });

    let linesRun = [];
    var accumulator = 0;
    let exeLoc = 0;

    for (; exeLoc < lines.length;) {
        if(linesRun.includes(exeLoc)) {
            answer = accumulator;
            break;
        }

        linesRun.push(exeLoc);

        switch (lines[exeLoc].instruction) {
            case "acc":
                accumulator += lines[exeLoc].value
                exeLoc++;
            break;
            case "jmp":
                exeLoc += lines[exeLoc].value;
            break;
            case "nop":
                exeLoc++;
            break;
        }
    }

    console.log(answer);
});