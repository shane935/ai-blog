module.exports = {
  "default": {
    "requireModule": ["ts-node/register"],
    "paths": ["app/**/_features/*.feature"],
    "require": ["app/**/_features/*.test.ts"],
    "publishQuiet": true
  }
}