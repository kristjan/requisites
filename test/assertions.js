var r = require('../requisites'),
    assert = require('assert');

r.get('https://github.com', function(res) {
  assert.doesNotThrow(function() {
    res.should.succeed();
  });
  assert.throws(function() {
    res.should.fail();
  });
});

r.get('http://github.com', function(res) {
  assert.doesNotThrow(function() {
    res.should.redirectTo('https://github.com/', 301);
  });
  assert.throws(function() {
    res.should.succeed();
  });
  assert.throws(function() {
    res.should.fail();
  });
});

r.get('https://github.com/kristjan/requisites/nonsense', function(res) {
  assert.doesNotThrow(function() {
    res.should.beMissing();
  });
  assert.doesNotThrow(function() {
    res.should.fail();
  });
  assert.throws(function() {
    res.should.succeed();
  });
  assert.throws(function() {
    res.should.redirectTo('https://github.com/');
  });
});
