fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var array = data.split("\n");

    var answer = 0;

    array.forEach(element => {
        var splitted = element.split(" ");
        numbers = splitted[0];
        letter = splitted[1];
        password = splitted[2];

        letter = letter.replace(":", "");


        lower = parseInt(numbers.split("-")[0]);
        upper = parseInt(numbers.split("-")[1]);

        count = 0;

        if (password[lower - 1] == letter)
            count++;

        if (password[upper - 1] == letter)
            count++;

        if (count == 1)
            answer++;
    });

    console.log(answer);
});