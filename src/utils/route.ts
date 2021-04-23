type MatchOpts = { path: RegExp }

export const matches = ({ path }: MatchOpts): boolean =>
  path?.test(location.pathname)
