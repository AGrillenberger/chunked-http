const request = require("request");

exports.request = function(url, callback) {
  request(url).on('data', function(data) {
    var myData = data.toString(); // convert to string
    var firstNL = myData.indexOf("\n")
    var expLength = parseInt(myData.substring(0, firstNL - 1), 16) + 2; // +2 for \r\n
    myData = myData.substring(firstNL + 1); // strip first line
    if(myData.length != expLength) { return false; }

    var ret = myData;
    try {
        ret = JSON.parse(myData);
    } catch (e) { }

    callback(ret);
  })
};
