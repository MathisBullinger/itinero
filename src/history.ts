import * as loc from './location'

type PushOpts = {
  replace?: boolean
}

export const push = (
  location: string | loc.LocationInput,
  { replace }: PushOpts = {}
) => {
  loc.update(typeof location === 'string' ? loc.parse(location) : location)
  history[replace ? 'replaceState' : 'pushState'](null, '', loc.stringify())
}

export const back = () => {
  history.back()
}

window.addEventListener('popstate', () => {
  loc.update(
    loc.parse(window.location.href.slice(window.location.origin.length))
  )
})
