fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var dataArray = data.split("\n");

    var passArray = [];

    var mustHaveFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"]

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

        for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i].split(":")[0];
            var fieldValue = fields[i].split(":")[1];

            switch (fieldName) {
                case "byr":
                    if (fieldValue.length != 4 || parseInt(fieldValue) < 1920 || parseInt(fieldValue) > 2002)
                        return;
                    break;
                case "iyr":
                    if (fieldValue.length != 4 || parseInt(fieldValue) < 2010 || parseInt(fieldValue) > 2020)
                        return;
                    break;
                case "eyr":
                    if (fieldValue.length != 4 || parseInt(fieldValue) < 2020 || parseInt(fieldValue) > 2030)
                        return;
                    break;
                case "hgt":
                    if (fieldValue.includes("cm")) {
                        if (isNaN(fieldValue.split("c")[0]))
                            return;
                    }
                    else if (fieldValue.includes("in")) {
                        if (isNaN(fieldValue.split("i")[0]))
                            return;
                    }
                    else
                        return;
                    break;
                case "hcl":
                    const regex = /^#(\d|[a-z]){6}$/g;
                    if (!regex.test(fieldValue))
                        return;
                    break;
                case "ecl":
                    if (!(fieldValue == "amb" || fieldValue == "blu" || fieldValue == "brn" || fieldValue == "gry" || fieldValue == "grn" || fieldValue == "hzl" || fieldValue == "oth"))
                        return;
                    break;
                case "pid":
                    const regex2 = /^\d{9}$/g;
                    if (!regex2.test(fieldValue))
                        return;
                    break;
            }

            fieldNames.push(fieldName);
        }

        for (var i = 0; i < mustHaveFields.length; i++) {
            if (!fieldNames.includes(mustHaveFields[i]))
                return;
            else if (i == mustHaveFields.length - 1)
                count++;
        }
    });

    console.log(count);
});