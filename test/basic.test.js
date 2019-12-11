'use strict'

const existingHostname = process.env.ALLOWED_HOSTNAME
process.env.ALLOWED_HOSTNAME = 'www.example.com'
const oneHostname = require('../lib/index.js')

describe('express-one-hostname', () => {
  it('should return a fn when required', () => {
    expect(oneHostname).toBeDefined()
    expect(oneHostname).not.toBeNull()
    expect(oneHostname).toBeInstanceOf(Function)
  })

  it('should call next fn when done', done => {
    oneHostname({ hostname: process.env.ALLOWED_HOSTNAME }, {}, () => done())
  })

  it.each`
    protocol   | host                 | url
    ${'http'}  | ${'foo.local'}       | ${'/'}
    ${'https'} | ${'bar.baz'}         | ${'/foo'}
    ${'http'}  | ${'not.example.com'} | ${'/foo/bar'}
    ${'https'} | ${'not.another.com'} | ${'/?foo=bar&bar=baz'}
    ${'https'} | ${'not.another.com'} | ${'/foo/bar?foo=bar&bar=baz'}
  `('should redirect $url when not matching hostname', () => {
    let redirectCalled
    oneHostname(
      { hostname: 'not.example.com', originalUrl: '/', protocol: 'https' },
      { redirect: (code, location) => (redirectCalled = { code, location }) },
      () => {}
    )
    expect(redirectCalled).toMatchObject({
      code: 301,
      location: `https://${process.env.ALLOWED_HOSTNAME}/`
    })
  })

  afterAll(() => {
    process.env.ALLOWED_HOSTNAME = existingHostname
  })
})
