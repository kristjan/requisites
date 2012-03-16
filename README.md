## Requisites

Framework-agnostic test helpers and assertions for web requests

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

Assert failure (HTTP 500)

    response.should.fail();

Assert redirections (HTTP 3XX; default 302)

    response.should.redirectTo(url[, httpCode]);
