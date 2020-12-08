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
        let counts = dataArray[i].match(/\d/g);


        var countedChildren = null;
        if (children !== null)
            countedChildren = children.map((child, i) => {

                return { name: child, amount: parseInt(counts[i]) };
            });

        parsedData.set(color, countedChildren);
    }

    answer = recursiveCheck(parsedData.get("shiny gold"), parsedData, 1, 0);

    //-1 because you don't want to count the main mag
    console.log(answer - 1);
});

function recursiveCheck(children, dictionary, amount, count) {

    if (children != null)
        for (const child of children) {
            count = recursiveCheck(dictionary.get(child.name), dictionary, amount * child.amount, count);
        }
    count += amount;
    return count;
}