fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var dataArray = data.split("\n");
    var groups = [];
    var groupAnswers = [];
    var answer = 0;

    for (var i = 0; i < dataArray.length; i++) {

        if (dataArray[i] != "") {
            groupAnswers.push(dataArray[i]);
            if (i == dataArray.length - 1)
                groups.push(groupAnswers);
        }
        else {
            groups.push(groupAnswers);
            groupAnswers = [];
        }
    }

    for (let i = 0; i < groups.length; i++) {
        var uniqueAnswers = "";

        for (let j = 0; j < groups[i].length; j++) {
            for (let k = 0; k < groups[i][j].length; k++) {
                if (!uniqueAnswers.includes(groups[i][j].charAt(k)))
                    uniqueAnswers += groups[i][j].charAt(k);
            }
        }

        answer += uniqueAnswers.length;
    }

    console.log(answer);
});