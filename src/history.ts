import * as loc from './location'

type PushOpts = {
  replace?: boolean
}

export const push = (
  location: string | Partial<Location>,
  { replace }: PushOpts = {}
) => {
  loc.update(typeof location === 'string' ? loc.parse(location) : location)
  history[replace ? 'replaceState' : 'pushState'](null, '', loc.stringify())
}

window.addEventListener('popstate', () => {
  loc.update(
    loc.parse(window.location.href.slice(window.location.origin.length))
  )
})
