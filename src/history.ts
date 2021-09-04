import * as loc from './location'
export { listen } from './location'

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
  loc.update({
    search: '',
    hash: '',
    ...loc.parse(location.href.slice(location.origin.length)),
  })
})
