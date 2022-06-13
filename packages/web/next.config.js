/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
    '@feedelity/shared'
]);

module.exports = withTM({
  reactStrictMode: true
});
