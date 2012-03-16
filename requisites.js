var request = require('request')
  , assert = require('assert')
  , baseURL = ''
  ;

var SUPPORTED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

function attachAssertions(response) {
  response.should = {
    haveCode: function(code) {
      assert.equal(response.statusCode, code);
    }
  , succeed: function() {
      response.should.haveCode(200);
    }
  , fail: function() {
      assert(response.statusCode >= 400);
    }
  , beMissing: function() {
      response.should.haveCode(404);
    }
  , redirectTo: function(url, code) {
      if (typeof code === 'undefined') code = 302;
      assert.equal(response.headers.location, baseURL + url);
      response.should.haveCode(code);
    }
  };
  return response;
}

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
      if (callback) callback(attachAssertions(res));
    });
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
