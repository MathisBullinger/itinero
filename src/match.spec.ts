import { toRegex, subNamed, matchPath, classes } from './match'

const testConvert = <T extends string | RegExp>(
  tested: string,
  comp: T,
  func: (v: string) => T
) =>
  it(`should return ${comp} for '${tested}'`, () =>
    expect(func(tested).toString()).toBe(comp.toString()))

const testAccepts = (matcher: RegExp, path: string, accept: boolean) =>
  it(`${matcher} should ${accept ? 'accept' : 'reject'} '${path}'`, () =>
    expect(matcher.test(path)).toBe(accept))

describe('toRegex', () => {
  testConvert('/foo', /^\/foo\/?$/i, toRegex)
  testConvert('/foo/', /^\/foo\/?$/i, toRegex)

  testAccepts(toRegex('/foo'), '/foo', true)
  testAccepts(toRegex('/foo'), '/foo/', true)
  testAccepts(toRegex('/foo'), '/FOO', true)
  testAccepts(toRegex('/foo'), '/fOo', true)

  testAccepts(toRegex('/foo'), '/foo/bar', false)
  testAccepts(toRegex('/foo'), '/foo/bar/', false)
})

describe('named groups shorthand', () => {
  testConvert('path/:id', `path/(?<id>${classes.param}+)`, subNamed)

  testAccepts(toRegex('/path/:id'), '/path', false)
  testAccepts(toRegex('/path/:id'), '/path/foo', true)

  test('returns group', () => {
    expect(
      matchPath('/path/:id', { path: '/path/foo' } as any)!.groups
    ).toEqual({ id: 'foo' })
    expect(
      matchPath('/path/:id', { path: '/path/123' } as any)!.groups
    ).toEqual({ id: '123' })
  })
})
