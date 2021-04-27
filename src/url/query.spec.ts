import { merge, ParamObj } from './query'

const expectParams = (v: URLSearchParams, expected: ParamObj) =>
  expect(Object.fromEntries(v.entries())).toEqual(expected)

describe('merge', () => {
  const a2h = { a: 'b', c: 'd', e: 'f', g: 'h' }

  it('should merge URLSearchParams & URLSearchParams', () => {
    const a = new URLSearchParams()
    a.set('a', 'b')
    a.set('c', 'd')
    const b = new URLSearchParams()
    b.set('e', 'f')
    b.set('g', 'h')
    expectParams(merge(a, b), a2h)
  })

  it('should merge string & string', () => {
    expectParams(merge('?a=b&c=d', '?e=f&g=h'), a2h)
  })

  it('should merge string & URLSearchParams', () => {
    const b = new URLSearchParams()
    b.set('e', 'f')
    b.set('g', 'h')
    expectParams(merge('?a=b&c=d', b), a2h)
  })

  it('should merge URLSearchParams & string', () => {
    const a = new URLSearchParams()
    a.set('a', 'b')
    a.set('c', 'd')
    expectParams(merge(a, '?e=f&g=h'), a2h)
  })

  it('should tolerate missing leading "?"', () => {
    const expected = { a: 'b', c: 'd' }
    expectParams(merge('?a=b', '?c=d'), expected)
    expectParams(merge('a=b', '?c=d'), expected)
    expectParams(merge('?a=b', 'c=d'), expected)
    expectParams(merge('a=b', 'c=d'), expected)
  })

  it('should overwrite b with a', () => {
    expectParams(merge('foo=bar&a=b', 'foo=baz&c=d'), {
      foo: 'bar',
      a: 'b',
      c: 'd',
    })
  })
})
