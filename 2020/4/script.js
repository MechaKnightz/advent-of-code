
fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var dataArray = data.split("\n");

    var passArray = [];

    var mustHaveFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"]
    mustHaveFields.sort();

    var text = "";

    var count = 0;

    for (var i = 0; i < dataArray.length; i++) {
        temp = dataArray[i];
        if (dataArray[i] == "" || i == dataArray.lengt - 1) {
            passArray.push(text);
            text = "";
            continue;
        }
        if (text == "")
            text = dataArray[i];
        else
            text += " " + dataArray[i];
    }

    passArray.forEach(passport => {
        var fields = passport.split(" ");
        var fieldNames = [];

        fields.forEach(field => {
            fieldName = field.split(":")[0];
            fieldvalue = field.split(":")[1];

            fieldNames.push(fieldName);
        });

        for (var i = 0; i < mustHaveFields.length; i++) {
            if (!fieldNames.includes(mustHaveFields[i]))
                break;
            else if (i == mustHaveFields.length - 1)
                count++;
        }
    });

    console.log(count);
});