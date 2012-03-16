var r = require('../'),
    assert = require('assert');

r.get('https://github.com', function(res) {
  assert.doesNotThrow(function() {
    res.should.succeed();
    res.should.not.fail();
    res.should.not.redirect();
    res.should.not.be.missing();
  });
  assert.throws(function() { res.should.not.succeed(); });
  assert.throws(function() { res.should.fail();        });
  assert.throws(function() { res.should.redirect();    });
  assert.throws(function() { res.should.be.missing();  });
});


r.get('http://github.com', function(res) {
  assert.doesNotThrow(function() {
    res.should.redirect();
    res.should.redirect(301);
    res.should.redirectTo('https://github.com/');
    res.should.redirectTo('https://github.com/', 301);
    res.should.not.redirect(302);
    res.should.not.redirectTo('http://google.com/');
    res.should.not.succeed();
    res.should.not.fail();
    res.should.not.be.missing();
  });
  assert.throws(function() { res.should.not.redirect();                   });
  assert.throws(function() { res.should.redirect(302);                    });
  assert.throws(function() { res.should.redirectTo('http://google.com/'); });
  assert.throws(function() { res.should.succeed();                        });
  assert.throws(function() { res.should.fail();                           });
  assert.throws(function() { res.should.be.missing();                     });
                                                                          });

r.get('https://github.com/kristjan/requisites/nonsense', function(res) {
  assert.doesNotThrow(function() {
    res.should.be.missing();
    res.should.fail();
    res.should.not.succeed();
    res.should.not.redirect();
  });
  assert.throws(function() { res.should.not.be.missing(); });
  assert.throws(function() { res.should.not.fail();       });
  assert.throws(function() { res.should.succeed();        });
  assert.throws(function() { res.should.redirect();       });
});
