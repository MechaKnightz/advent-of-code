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

    var parsedData = new Map();

    for (let i = 0; i < dataArray.length; i++) {
        let color = dataArray[i].match(/^[a-z ]*(?= bags contain)/g)[0];
        let children = dataArray[i].match(/(?<=[0-9] )[a-z ]*(?= bag)/g);

        parsedData.set(color, children);
    }

    var answers = [];
    for (let [key, value] of parsedData) {
        if(answers.includes(key))
            continue;
        
        recursiveCheck(key, value, parsedData, answers);

        answer = answers.length;
    }

    console.log(answer);
});

function recursiveCheck(parent, children, dictionary, answers) {

    if(children === null)
        return false;
    let hasShinyGold = false;
    for (const child of children) {
        if(child == "shiny gold")
            hasShinyGold = true;
        
        if(answers.includes(child)) {
            hasShinyGold = true;
            continue;
        }
        
        if(recursiveCheck(child, dictionary.get(child), dictionary, answers))
            hasShinyGold = true;
    }

    if(hasShinyGold && !answers.includes(parent))
        answers.push(parent);

    return hasShinyGold;
}