'use strict';

var libphonenumber = require('google-libphonenumber')
var PNF = libphonenumber.PhoneNumberFormat;

var defaultCountry = 'US';
var defaultFormat = PNF.NATIONAL;

function setDefaultCountry(country) {
  defaultCountry = country;
}

function setDefaultFormat(format) {
  var matched = getFormatFromString(format);
  if (matched) {
    defaultFormat = matched;
  }
}

function getFormatFromString(formatStr) {
  switch (formatStr) {
    case 'INTERNATIONAL':
      return PNF.INTERNATIONAL;
    case 'NATIONAL':
      return PNF.NATIONAL;
    case 'E164':
      return PNF.E164;
  }
  return null;
}

function filter(number, country, format) {
  var country = country || defaultCountry;
  var format = getFormatFromString(format) || defaultFormat;

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
