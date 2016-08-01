# nunjucks-phone-filter

Phone number formatter for Nunjucks templating engine, based on Google's [libphonenumber](https://github.com/googlei18n/libphonenumber).

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
