var Assertion = require('should').Assertion
  ;

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
