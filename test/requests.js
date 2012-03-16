var r = require('../'),
    assert = require('assert');

r.setBaseURL('http://www.google.com');

r.get(function(res) {
  assert.equal(res.statusCode, 200);
});

r.get('/search', function(res) {
  assert.equal(res.statusCode, 302);
});

r.get('/search', {q: 'node requisites'}, function(res) {
  assert.equal(res.statusCode, 200);
});
