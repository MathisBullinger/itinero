import { Location } from './location'

export const matchPath = (pattern: RegExp | string, location: Location) =>
  (pattern instanceof RegExp ? pattern : toRegex(pattern)).exec(
    decodeURIComponent(location.path)
  )

export const toRegex = (matcher: string): RegExp =>
  new RegExp(`^${subNamed(matcher.replace(/\/$/, ''))}/?$`, 'i')

export const subNamed = (v: string): string =>
  v.replace(/(\/:([a-z_]\w*))/g, `(?:\\/(?<$2>${classes.param}+))`)

export const classes = {
  param: '\\w',
}

export class Matcher {
  private readonly path?: RegExp
  private readonly query?: RegExp

  constructor(pattern: string | RegExp) {
    if (typeof pattern !== 'string') {
      this.path = pattern
      return
    }

    const queryPart = /\?[^#</]+/.exec(pattern)
    if (queryPart) {
      pattern =
        pattern.slice(0, queryPart.index) +
        pattern.slice(queryPart.index + queryPart[0].length)

      this.query = new RegExp(
        queryPart[0]
          .slice(1)
          .split('&')
          .map(v => `(?=.*[?&]${v})`)
          .join(''),
        'i'
      )
    }

    if (pattern)
      this.path = new RegExp(`^${subNamed(pattern.replace(/\/$/, ''))}/?$`, 'i')
  }

  public match(location: Location) {
    let groups: Record<string, string> | null = {}

    if (this.path) {
      const pathMatch = this.path.exec(decodeURIComponent(location.path))
      groups = pathMatch && (pathMatch.groups ?? {})
    }

    if (this.query && !this.query.test(location.search)) groups = null

    return groups
  }
}
