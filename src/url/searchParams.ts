import { omit } from '../utils/object'

// basically an immutable opinionated version of URLSearchParams
// with extra utilities and no support for duplicate keys

export default class SearchParams {
  public readonly content: ParamObj

  constructor(from: ParamSource = {}) {
    if (typeof from === 'object' && !(from instanceof URLSearchParams))
      this.content = Object.fromEntries(
        Object.entries(from).map(([k, v]) => [
          k,
          typeof v === 'object' && v !== null ? JSON.stringify(v) : v,
        ])
      )
    else if (from)
      this.content = Object.fromEntries(
        [...new URLSearchParams(from as any).entries()].map(([k, v]) => [
          k,
          SearchParams.parseValue(v),
        ])
      )
    else this.content = {}
  }

  public set(diffs: ParamObj): SearchParams {
    return new SearchParams({ ...this.content, ...diffs })
  }

  public remove(...keys: string[]): SearchParams {
    return new SearchParams(omit(this.content, ...keys))
  }

  public merge(
    target: ParamSource | SearchParams,
    reverse = false
  ): SearchParams {
    const other =
      target instanceof SearchParams ? target : new SearchParams(target)
    return new SearchParams(
      reverse
        ? { ...this.content, ...other.content }
        : { ...other.content, ...this.content }
    )
  }

  public static merge(source: ParamSource, target: ParamSource): SearchParams {
    return new SearchParams(source).merge(target)
  }

  public toString(): string {
    return Object.entries(this.content)
      .map(([k, v]) => (v === '' ? k : `${k}=${v}`))
      .join('&')
  }

  private static parseValue(v: any): ParamValue {
    if (!v) return v
    if (v === 'undefined') return undefined
    if (v === 'null') return null
    if (v === 'NaN') return NaN
    const n = Number(v)
    if (isNaN(n)) return v
    return n
  }
}

type ParamSource = string | ParamObj | URLSearchParams
type ParamValue = string | number | undefined | null
export type ParamObj = Record<string, ParamValue>
