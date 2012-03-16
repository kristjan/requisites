var request = require('request')
  , Assertion = require('should').Assertion
  , baseURL = ''
  ;

var SUPPORTED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

Assertion.prototype.succeed = function() {
  var res = this.obj;
  res.should.have.property('statusCode');
  code = res.statusCode;

  this.assert(
    code === 200,
    'expected ' + res.request.uri.href + ' to succeed, but was ' + code,
    'expected ' + res.request.uri.href + ' to not succeed'
  );
  return this;
};

Assertion.prototype.fail = function() {
  var res = this.obj;
  res.should.have.property('statusCode');
  code = res.statusCode;

  this.assert(
    this.obj.statusCode >= 400,
    'expected ' + res.request.uri.href + ' to fail, but was ' + code,
    'expected ' + res.request.uri.href + ' to not fail'
  );
  return this;
};

Assertion.prototype.missing = function() {
  var res = this.obj;
  res.should.have.property('statusCode');
  code = res.statusCode;

  this.assert(
    code === 404,
    'expected ' + res.request.uri.href + ' to be missing, but was ' + code,
    'expected ' + res.request.uri.href + ' to not be missing'
  );
};

Assertion.prototype.redirect = function(expectedCode) {
  var res = this.obj;
  res.should.have.property('statusCode');
  code = res.statusCode;

  if (expectedCode) {
    this.assert(
      code === expectedCode,
      'expected ' + res.request.uri.href + ' to redirect with ' + expectedCode + ', but was ' + code,
      'expected ' + res.request.uri.href + ' to not redirect with ' + expectedCode
    );
  } else {
    this.assert(
      code >= 300 && code < 400,
      'expected ' + res.request.uri.href + ' to redirect, but was ' + code,
      'expected ' + res.request.uri.href + ' to not redirect'
    );
  }
};

Assertion.prototype.redirectTo = function(url, code) {
  var res = this.obj;
  res.should.have.property('headers');
  redirectUrl = res.headers.location;

  res.should.redirect(code);

  this.assert(
    redirectUrl === url,
    'expected ' + res.request.uri.href + ' to redirect to ' + url + ', but redirected to ' + redirectUrl,
    'expected ' + res.request.uri.href + ' to not redirect to ' + url
  );
};

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
      if (typeof callback === 'function') callback(res);
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
