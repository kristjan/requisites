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

    r.succeeded(res);

Assert failure (HTTP 500)

    r.failed(res);

Assert redirections (HTTP 3XX; default 302)

    r.redirected(res, url[, code]);
