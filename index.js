'use strict';

var libphonenumber = require('google-libphonenumber')
var PNF = libphonenumber.PhoneNumberFormat;

var defaultCountry = 'US';
var defaultFormat = PNF.NATIONAL;

function setDefaultCountry(country) {
  defaultCountry = country;
}

function setDefaultFormat(format) {
  switch (format) {
    case 'INTERNATIONAL':
      defaultFormat = PNF.INTERNATIONAL;
      break;
    case 'NATIONAL':
      defaultFormat = PNF.NATIONAL;
      break;
    case 'E164':
      defaultFormat = PNF.E164;
      break;
  }
}

function filter(number, country, format) {
  var country = defaultCountry || country;
  var format = defaultFormat || format;

  var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  return phoneUtil.format(phoneUtil.parse(number, country), format);
}

function install(env) {
  env.addFilter('phone_number', filter);
}

module.exports = filter;
module.exports.setDefaultCountry = setDefaultCountry;
module.exports.setDefaultFormat = setDefaultFormat;
module.exports.install = install;
