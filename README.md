## Requisites

Web request helpers and extensions to should.js

## Usage

    var r = require('requisites');

## Examples

### Making requests

    r.get(url, [data], function(res) {
      // assertions
    });

### Assertions

Assert success (HTTP 200)

    response.should.succeed();

Assert redirections (HTTP 3XX)

    response.should.redirect([httpCode]);
    response.should.redirectTo(url[, httpCode]);

Assert failure (HTTP >= 400)

    response.should.fail();
