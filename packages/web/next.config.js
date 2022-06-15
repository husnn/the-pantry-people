/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
    '@tpp/shared'
]);

module.exports = withTM({
  reactStrictMode: true
});
