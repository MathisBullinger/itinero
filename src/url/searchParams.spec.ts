import SearchParams from './searchParams'

describe('constructor', () => {
  it('constructs from string', () => {
    expect(new SearchParams('a=b&c=d').content).toEqual({ a: 'b', c: 'd' })
    expect(new SearchParams('?a=b&c=d').content).toEqual({ a: 'b', c: 'd' })
  })

  it('constructs from URLSearchParams', () => {
    const params = new URLSearchParams('foo=bar&baz&num=2')
    expect(new SearchParams(params).content).toEqual({
      foo: 'bar',
      baz: '',
      num: 2,
    })
  })

  it('constructs from paramObj', () => {
    expect(new SearchParams({ a: 'b' }).content).toEqual({ a: 'b' })
    expect(
      new SearchParams({ str: '-', num: 2, null: null, und: undefined }).content
    ).toEqual({ str: '-', num: 2, null: null, und: undefined })
  })

  it('serializes object values', () => {
    expect(new SearchParams({ foo: { bar: 'baz' } } as any).content).toEqual({
      foo: '{"bar":"baz"}',
    })
  })

  it('handles missing values', () => {
    expect(new SearchParams('foo=bar&baz').content).toEqual({
      foo: 'bar',
      baz: '',
    })
  })

  it('defaults to no params', () => {
    expect(new SearchParams().content).toEqual({})
  })

  it('parses null, undefined, and numbers', () => {
    expect(
      new SearchParams(
        `a=abc&
        b&
        c=undefined&
        d=null&
        e=123&
        f=-2&
        g=1.2&
        h=1.2.3&
        i=0xA&
        j=Infinity&
        k=infinity&
        l=-Infinity&
        m=NaN&
        n=nan&
        o=0&
        p=-0
      `.replace(/\s/g, '')
      ).content
    ).toEqual({
      a: 'abc',
      b: '',
      c: undefined,
      d: null,
      e: 123,
      f: -2,
      g: 1.2,
      h: '1.2.3',
      i: 0xa,
      j: Infinity,
      k: 'infinity',
      l: -Infinity,
      m: NaN,
      n: 'nan',
      o: 0,
      p: -0,
    })
  })
})

describe('set', () => {
  const params = new SearchParams({ foo: 'bar' })
  expect(params.content).toEqual({ foo: 'bar' })
  expect(params.set({ foo: 'baz' }).content).toEqual({ foo: 'baz' })
  expect(params.content).toEqual({ foo: 'bar' })
})

describe('delete', () => {
  const params = new SearchParams({ a: 1, b: 2, c: 3 })
  expect(params.content).toEqual({ a: 1, b: 2, c: 3 })
  expect(params.remove('a', 'c').content).toEqual({ b: 2 })
  expect(params.content).toEqual({ a: 1, b: 2, c: 3 })
})

describe('merge', () => {
  const params = new SearchParams({ a: 1, b: 2, foo: 'bar' })

  expect(params.merge({ c: 3, foo: 'baz' }).content).toEqual({
    a: 1,
    b: 2,
    c: 3,
    foo: 'bar',
  })
  expect(params.merge('?c=3&foo=baz').content).toEqual({
    a: 1,
    b: 2,
    c: 3,
    foo: 'bar',
  })
  expect(params.merge({ c: 3, foo: 'baz' }, true).content).toEqual({
    a: 1,
    b: 2,
    c: 3,
    foo: 'baz',
  })
  expect(params.content).toEqual({ a: 1, b: 2, foo: 'bar' })
})

describe('static merge', () => {
  const aSearch = new URLSearchParams('a=1&b=2')
  const bSearch = new URLSearchParams('b=x&c=3')
  const aParam = { a: 1, b: 2 }
  const bParam = { b: 'x', c: 3 }
  const aStr = 'a=1&b=2'
  const bStr = 'b=x&c=3'
  const a2b = { a: 1, b: 2, c: 3 }
  const b2a = { a: 1, b: 'x', c: 3 }

  it('merges URLSearchParams & URLSearchParams', () => {
    expect(SearchParams.merge(aSearch, bSearch).content).toEqual(a2b)
    expect(SearchParams.merge(bSearch, aSearch).content).toEqual(b2a)
  })

  it('merges ParamObj & ParamObj', () => {
    expect(SearchParams.merge(aParam, bParam).content).toEqual(a2b)
    expect(SearchParams.merge(bParam, aParam).content).toEqual(b2a)
  })

  it('merges string & string', () => {
    expect(SearchParams.merge(aStr, bStr).content).toEqual(a2b)
    expect(SearchParams.merge(bStr, aStr).content).toEqual(b2a)
  })

  it('merges string & URLSearchParams', () => {
    expect(SearchParams.merge(aStr, bSearch).content).toEqual(a2b)
    expect(SearchParams.merge(bSearch, aStr).content).toEqual(b2a)
  })

  it('merges string & ParamObj', () => {
    expect(SearchParams.merge(aStr, bParam).content).toEqual(a2b)
    expect(SearchParams.merge(bParam, aStr).content).toEqual(b2a)
  })

  it('merges ParamObj & URLSearchParams', () => {
    expect(SearchParams.merge(aParam, bSearch).content).toEqual(a2b)
    expect(SearchParams.merge(bSearch, aParam).content).toEqual(b2a)
  })
})

describe('toString', () => {
  const params = new URLSearchParams('a=foo&b=123')
  expect(new SearchParams(params).toString()).toBe(params.toString())
  expect(new SearchParams({ foo: 'asdf', bar: '', baz: 123 }).toString()).toBe(
    'foo=asdf&bar&baz=123'
  )
})
