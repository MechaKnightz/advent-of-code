fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var dataArray = data.split("\n");
    var answer = 0;
    var seats = [];

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

        seats.push({ row, column, seatId })
    }

    var empty = [];

    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 8; j++) {

            if (seatAtRow(seats, i, j) == null) {
                empty.push({ row: i, column: j });
                let thisSeatId = i * 8 + j;

                let prevSeatExists = false;
                seats.forEach(seat => {
                    if (seat.seatId == thisSeatId - 1)
                        prevSeatExists = true;
                });
                let nextSeatExists = false;
                seats.forEach(seat => {
                    if (seat.seatId == thisSeatId + 1)
                        nextSeatExists = true;
                });

                if (prevSeatExists && nextSeatExists)
                    answer = thisSeatId;
            }
        }
    }

    console.log(answer);
});

function seatAtRow(seats, row, column) {
    for (let k = 0; k < seats.length; k++) {
        if (row == seats[k].row && column == seats[k].column)
            return seats[k];
        if (k == seats.length - 1) {
            return null;
        }
    }
}