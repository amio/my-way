# my-way

[![npm version][npm-src]][npm-href]
[![Coverage Status][coverage-src]][coverage-href]
[![Install size][bundlephobia-src]][bundlephobia-href]
[![License][license-src]][license-href]

Minimal path matcher.

## Usage

```javascript
import matchRoute from 'my-way'

const route = '/users/:id'
const matched = matchRoute(route, '/users/123') // => { id: "123" }
```

## Segments

- `/literal` Literal segment
- `/:name` Named segment
- `/:name+` Rest segment
- `/:name?` Optional segment
- `/:name*` Optional rest segment
- `/:name<regex>` Named segment with regex matching
- `/:name+<regex>` Rest segment with regex matching
- `/:name?<regex>` Optional segment with regex matching
- `/:name*<regex>` Optional rest segment with regex matching

## Examples

```javascript
matchRoute('/users/:id', '/users')
// null

matchRoute('/users/:id', '/users/123')
// { id: "123" }

matchRoute('/users/:id', '/users/123/')
// { id: "123" }

matchRoute('/users/:id', '/users/123/?query=will-be-omitted')
// { id: "123" }

matchRoute('/users/:id<\\d+>', '/users/alice')
// null

matchRoute('/users/:id<\\d+>', '/users/123')
// { id: "123" }

matchRoute('/users/:id/:status?<active|inactive>', '/users/123')
// { id: "123" }

matchRoute('/users/:id/:status?<active|inactive>', '/users/123/active')
// { id: "123", status: "active" }

matchRoute('/users/:id/:status?<active|inactive>', '/users/123/blue')
// null

matchRoute('/:owner/:repo/:path+', '/amio/my-way/package.json')
// { owner: "amio", repo: "my-way", path: "package.json" }

matchRoute('/:owner/:repo/:path+', '/amio/my-way/src/index.ts')
// { owner: "amio", repo: "my-way", path: "src/index.ts" }

matchRoute('/:owner/:repo/:path+', '/amio/my-way')
// null

matchRoute('/:owner/:repo/:path*', '/amio/my-way')
// { owner: "amio", repo: "my-way" }

matchRoute('/:owner/:repo/:url*', '/amio/my-way/https://github.com/amio/my-way')
// { owner: "amio", repo: "my-way", url: "https://github.com/amio/my-way" }

matchRoute('/:owner/:repo/:url*', '/amio/my-way/https%3A%2F%2Fgithub.com%2Famio%2Fmy-way')
// { owner: "amio", repo: "my-way", url: "https://github.com/amio/my-way" }
```

## Not supported

- Multi slashes in pathname

  ```javascript
  matchRoute('/:owner/:repo', '//my-way')
  // null
  ```

[npm-src]: https://badgen.net/npm/v/my-way
[npm-href]: https://www.npmjs.com/package/my-way
[coverage-src]: https://badgen.net/codecov/c/github/amio/my-way
[coverage-href]: https://codecov.io/gh/amio/my-way
[bundlephobia-src]: https://badgen.net/bundlephobia/min/my-way
[bundlephobia-href]: https://bundlephobia.com/result?p=my-way
[license-src]: https://badgen.net/badge/license/MIT
[license-href]: LICENSE.md
