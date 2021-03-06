fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var array = data.split("\n");

    var answer = 1;
    var width = array[0].length;

    var slopeArray = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    var answerArray = []

    slopeArray.forEach(element => {
        var horizontalSpeed = element[0];
        var verticalSpeed = element[1];

        var count = 0;
        var horizontalIndex = 0;
        for (var i = 0; i < array.length; i += verticalSpeed) {
            var indexToCheck = horizontalIndex % width;
            horizontalIndex += horizontalSpeed;

            if (array[i].charAt(indexToCheck) == "#")
                count++;
        }

        answerArray.push(count)
    });

    answerArray.forEach(element => {
        answer *= element;
    });

    console.log(answer);
});