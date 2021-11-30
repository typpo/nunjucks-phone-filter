# nunjucks-phone-filter
[![npm](https://img.shields.io/npm/v/nunjucks-phone-filter)](https://www.npmjs.com/package/nunjucks-phone-filter)

Phone number formatter for Nunjucks templating engine, based on Google's [libphonenumber](https://github.com/googlei18n/libphonenumber).

```
npm install --save nunjucks-phone-filter
```

## Usage

First get your nunjucks environment object.
```js
// Environment from normal nunjucks configuration with express...
var env = nunjucks.configure('views', {
  express: app,
  // ...
});

// or just create an environment object.
var env = new nunjucks.Environment();
```

Use `install()` to register a filter named `phone_number` with nunjucks:

```js
require('nunjucks-phone-filter').install(env);
```

Or, customize the filter name by using nunjucks `addFilter`:

```js
env.addFilter('my_phone_formatter', require('nunjucks-phone-filter'));
```

Then use it in a nunjucks template:

```
<p>{{foo.phone | phone_number}}</p>
```

## Optional formatting arguments

The `phone_number` filter takes two arguments, `country` and `format`. Both are strings.

By default, country is `US` and format is `NATIONAL`. Other valid formats are `INTERNATIONAL` and `E164` (see [E164 on wikipedia](https://en.wikipedia.org/wiki/E.164)).

You can pass arguments like so:

```
<p>{{foo.phone | phone_number('US', 'NATIONAL')}}</p>
```

```
{{ '9147727420' | phone_number('US', 'NATIONAL') }} ==> (914) 772-7420
{{ '9147727420' | phone_number('US', 'INTERNATIONAL') }} ==> +1 914-772-7420
{{ '9147727420' | phone_number('US', 'E164') }} ==> (914) 772-7420

{{ '2071234567' | phone_number('GB', 'NATIONAL') }} ==> 020 7123 4567
{{ '2071234567' | phone_number('GB', 'INTERNATIONAL') }} ==> +44 20 7123 4567
{{ '2071234567' | phone_number('GB', 'E164') }} ==> 020 7123 4567
```

## Default arguments

You can override the default country and format by calling `setDefaultCountry` and `setDefaultFormat`.

For example:
```
const phoneFilter = require('nunjucks-phone-filter');

phoneFilter.setDefaultCountry('GB');
phoneFilter.setDefaultFormat('INTERNATIONAL');

phoneFilter.install(env);
```

Because defaults have been modified, you no longer have to pass arguments to `phone_number`:
```
{{ '2071234567' | phone_number }} ==> +44 20 7123 4567
```

## License (MIT)

Copyright (C) 2016 by Ian Webster (ianww.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
