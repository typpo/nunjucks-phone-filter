# nunjucks-phone-filter

Phone number formatter for Nunjucks templating engine, based on Google's [libphonenumber](https://github.com/googlei18n/libphonenumber).

```
npm install --save nunjucks-phone-filter
```

## Usage

First get your nunjucks environment object.
```
// Environment from normal nunjucks configuration with express...
var env = nunjucks.configure('views', {
  express: app,
  // ...
});

// or just create an environment object.
var env = new nunjucks.Environment();
```

Use `install()` to register the filter with nunjucks as `phone_number`:

```
require('nunjucks-phone-filter').install(env);
```

Or, customize the filter name by using nunjucks `addFilter`:

```
env.addFilter('my_phone_formatter', require('nunjucks-phone-filter'));
```

Then use it in a nunjucks template:

```
<p>{{foo.phone | phone_number}}</p>
```

## Optional formatting arguments

The `phone_number` filter takes two arguments, `country` and `format`. Both are strings.

By default, country is `US` and format is `NATIONAL`. Other valid formats are `INTERNATIONAL` and `E164` (see [E164 on wikipedia](https://en.wikipedia.org/wiki/E.164)).

You call pass arguments like so:

```
<p>{{foo.phone | phone_number('US', 'NATIONAL')}}</p>
```

```
'9147727420' | phone_number('US', 'NATIONAL') ==> (914) 772-7420
'9147727420' | phone_number('US', 'INTERNATIONAL') ==> +1 914-772-7420
'9147727420' | phone_number('US', 'E164') ==> (914) 772-7420

'2071234567' | phone_number('GB', 'NATIONAL') ==> 020 7123 4567
'2071234567' | phone_number('GB', 'INTERNATIONAL') ==> +44 20 7123 4567
'2071234567' | phone_number('GB', 'E164') ==> 020 7123 4567
```
