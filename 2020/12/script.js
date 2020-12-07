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
        var allAgreeAnswer = "";

        for (let j = 0; j < groups[i].length; j++) {
            for (let k = 0; k < groups[i][j].length; k++) {
                let allAgree = true;
                groups[i].forEach(otherAnswer => {
                    if(!otherAnswer.includes(groups[i][j].charAt(k)))
                        allAgree = false;
                });
                if(allAgree && !allAgreeAnswer.includes(groups[i][j].charAt(k)))
                    allAgreeAnswer += groups[i][j].charAt(k);
            }
        }

        answer += allAgreeAnswer.length;
    }

    console.log(answer);
});