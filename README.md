# batman-requires

eslint plugin to prevent `require`ing modules from parent directories. no parents. get it?

![Image of Sad Batman](http://static.fjcdn.com/comments/I+have+no+parents+_d9a17306e55b7fd5bf7c43fc64aaf7e5.jpg)

## installation

```bash
npm install eslint-plugin-batman-requires --save-dev
```

## usage

and then in your `.eslintrc`:

```json
{
  "plugins": [
    "batman-requires"
  ],
  "rules": {
    "batman-requires/no-parents": 2
  }
}
```

### whitelisting files

sometimes you *do* actually want to require parents. like if you put tests
in a `__tests__` directory right next to the modules, and each test file
requires its subject. rather than putting a custom `.eslintrc` in every
`__tests__` dir or putting eslint comments everywhere, you can just specify
some whitelist globs (minimatch-style) in your rule config, e.g.

```json
{
  "rules": {
    "batman-requires/no-parents": [2, "**/__tests__/*", "moar", "patterns", "here/*"]
  }
}
```
