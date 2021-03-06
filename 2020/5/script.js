fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var dataArray = data.split("\n");
    var answer = 0;

    for (let i = 0; i < dataArray.length; i++) {
        let currentRow = dataArray[i];

        let rowBinary = currentRow.slice(0, 7);
        let seatingBinary = currentRow.slice(7);

        let lower = 0;
        let upper = 127;

        for (let j = 0; j < rowBinary.length; j++) {
            let currentChar = rowBinary.charAt(j);

            let midPoint = (upper + lower) / 2;

            if (currentChar == "F") {
                upper = Math.floor(midPoint);
            }
            else {
                lower = Math.ceil(midPoint);
            }
        }
        let row = lower;

        lower = 0;
        upper = 7;

        for (let j = 0; j < seatingBinary.length; j++) {
            let currentChar = seatingBinary.charAt(j);

            let midPoint = (upper + lower) / 2;

            if (currentChar == "L") {
                upper = Math.floor(midPoint);
            }
            else {
                lower = Math.ceil(midPoint);
            }
        }

        let column = lower;

        let seatId = row * 8 + column;

        if (seatId > answer)
            answer = seatId;
    }

    console.log(answer);
});