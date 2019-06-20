import tap from 'tap'
import matchRoute from '..'

const runTest = (t, route, suite) => {
  // @ts-ignore
  Object.entries(suite).forEach(([url, result]) => {
    t.strictSame(
      matchRoute(route, url),
      result,
      `Test match ${url} against ${route}`
    )
  })
  t.end()
}

const testRouteSimple = '/user/:id<\\d+>'
tap.test(testRouteSimple, t => {
  const suite = {
    '/eiyo/123': null,
    '/user/eiyo': null,
    '/user/123/eiyo': null,
    '/user/123': { id: '123' },
    '/user/123/': { id: '123' },
    '//123': null
  }
  runTest(t, testRouteSimple, suite)
})


const testRouteMultiOptional = '/:branch?/:token?'
tap.test(testRouteMultiOptional, t => {
  const suite = {
    '/': {},
    '/master': { branch: 'master' },
    '/master/12345': { branch: 'master', token: '12345' }
  }
  runTest(t, testRouteMultiOptional, suite)
})

const testRouteMultiRegex = '/user/:id<\\d+>/:status?<active|inactive>'
tap.test(testRouteMultiRegex, t => {
  const suite = {
    '/user/eiyo': null,
    '/user/123': { id: '123' },
    '/user/123/active': { id: '123', status: 'active'},
    '/user/123/eiyo': null
  }
  runTest(t, testRouteMultiRegex, suite)
})

const testRouteOptionalSegment= '/github/:topic<stars|forks>/:owner/:repo/:chanel?/:more?'
tap.test(testRouteOptionalSegment, t => {
  const suite = {
    '/github/stars/amio/': null,
    '/github/eiyou/amio/badgen': null,
    '/github/stars/amio/badgen': {
      topic: 'stars',
      owner: 'amio',
      repo: 'badgen'
    },
    '/github/stars/amio/badgen/master': {
      topic: 'stars',
      owner: 'amio',
      repo: 'badgen',
      chanel: 'master'
    },
    '/github/stars/amio/badgen/master/': {
      topic: 'stars',
      owner: 'amio',
      repo: 'badgen',
      chanel: 'master'
    },
    '/github/stars/amio/badgen/master/more': {
      topic: 'stars',
      owner: 'amio',
      repo: 'badgen',
      chanel: 'master',
      more: 'more'
    },
  }
  runTest(t, testRouteOptionalSegment, suite)
})

const testRoutePlusSegment = '/david/:topic/:path+'
tap.test(testRoutePlusSegment, t => {
  const suite = {
    '/david/dep': null,
    '/david/dep/packages/babel-cli': {
      topic: 'dep',
      path: 'packages/babel-cli'
    },
    '/david/dep/https://eiyo.com': {
      topic: 'dep',
      path: 'https://eiyo.com'
    }
  }
  runTest(t, testRoutePlusSegment, suite)
})

const testRouteStarSegment = '/:repo/:path*'
tap.test(testRouteStarSegment, t => {
  runTest(t, testRouteStarSegment, {
    '/': null,
    '/eiyo': {
      repo: 'eiyo'
    },
    '/eiyo/package.json': {
      repo: 'eiyo',
      path: 'package.json'
    },
    '/eiyo/src/index.ts': {
      repo: 'eiyo',
      path: 'src/index.ts'
    },
    '/eiyo/~!@#%$^&*()-+_=/\\': {
      repo: 'eiyo',
      path: '~!@#%$^&*()-+_=/\\'
    }
  })
})
