fs = require('fs')
fs.readFile('./data', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.replace(/\r/g, "");
    var array = data.split("\n");
    for(var i = 0; i < array.length; i++)
    {
        array[i] = parseInt(array[i]);
    }
    var answer;

    array.forEach(outer => {
        array.forEach(inner => {
            if(outer + inner == 2020)
                answer = outer * inner;
        });
    });
    console.log(answer);
});