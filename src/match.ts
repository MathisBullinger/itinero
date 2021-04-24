import { Location } from './location'

export const matchPath = (pattern: RegExp | string, location: Location) =>
  (pattern instanceof RegExp ? pattern : toRegex(pattern)).exec(
    decodeURIComponent(location.path)
  )

export const toRegex = (matcher: string): RegExp =>
  new RegExp(`^${subNamed(matcher.replace(/\/$/, ''))}/?$`, 'i')

export const subNamed = (v: string): string =>
  v.replace(/(:([a-z_]\w*))/g, `(?<$2>${classes.param}+)`)

export const classes = {
  param: '\\w',
}
