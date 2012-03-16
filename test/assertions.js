var r = require('../requisites'),
    assert = require('assert');

r.get('https://github.com', function(res) {
  assert.doesNotThrow(function() {
    r.succeeded(res);
  });
  assert.throws(function() {
    r.failed(res);
  });
});

r.get('http://github.com', function(res) {
  assert.doesNotThrow(function() {
    r.redirected(res, 'https://github.com/', 301);
  });
  assert.throws(function() {
    r.succeeded(res);
  });
  assert.throws(function() {
    r.failed(res);
  });
});

r.get('https://github.com/kristjan/requisites/nonsense', function(res) {
  assert.doesNotThrow(function() {
    r.notFound(res);
  });
  assert.doesNotThrow(function() {
    r.failed(res);
  });
  assert.throws(function() {
    r.succeeded(res);
  });
  assert.throws(function() {
    r.redirected(res, 'https://github.com');
  });
});
