var request = require('request')
  , assert = require('assert')
  , baseURL = ''
  ;

var SUPPORTED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

module.exports = {
  setBaseURL: function(url) {
    baseURL = url;
  }
  // Adapted from http://fabianosoriani.wordpress.com/2011/08/31/testing-a-node-js-express-api-server-with-vows-functional/
, request: function(method, url, data, callback) {
    if (typeof url === 'function') {
      callback = url;
      url = undefined;
    } else if (typeof data === 'function') {
      callback = data;
      data = undefined;
    }
    var params = {
      method: method
    , url: baseURL + (url || '')
    , followRedirect: false
    };
    if (method === 'GET') params.qs = data;
    else params.body = data;
    request(params, function(req, res) {
      if (callback) callback(res);
    });
  }
, hasCode: function(response, code) {
    assert.equal(response.statusCode, code);
  }
, succeeded: function(response) {
    module.exports.hasCode(response, 200);
  }
, failed: function(response) {
    assert(response.statusCode >= 400);
  }
, notFound: function(response) {
    module.exports.hasCode(response, 404);
  }
, redirected: function(response, url, code) {
    if (typeof code === 'undefined') code = 302;
    module.exports.hasCode(response, code);
    assert.equal(response.headers.location, baseURL + url);
  }
};

function makeRequest(method) {
  return function(url, data, callback) {
    module.exports.request(method, url, data, callback);
  };
}

for (var i = 0; i < SUPPORTED_METHODS.length; i++) {
  var method = SUPPORTED_METHODS[i];
  module.exports[method.toLowerCase()] = makeRequest(method);
}
