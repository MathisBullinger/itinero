import { Location } from './location'

export const matchPath = (pattern: RegExp | string, location: Location) =>
  (pattern instanceof RegExp ? pattern : toRegex(pattern)).exec(location.path)

export const toRegex = (matcher: string): RegExp => new RegExp(`^${matcher}$`)
