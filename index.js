const request = require("request");
const md5 = require("md5");

var runningRequests = {};

exports.request = function(url, callback) {
  var r = request(url).on('data', function(data) {
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
  });

  runningRequests[md5(url)] = r;

  return md5(url);
};

exports.abort = function(hash) {
  if(runningRequests[hash]) {
    runningRequests[hash].abort();
    return true;
  }

  return false;
}
