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
            array.forEach(innerest => {
                if(outer + inner + innerest == 2020)
                answer = outer * inner * innerest;
            });
        });
    });
    console.log(answer);
});