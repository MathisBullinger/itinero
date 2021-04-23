import { Location } from './location'

type MatchOpts = { path: RegExp }

export const matches = ({ path }: MatchOpts, location: Location): boolean =>
  path?.test(location.path)
