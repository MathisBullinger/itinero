import * as loc from './location'

export const push = (location: string | Partial<Location>) => {
  loc.update(typeof location === 'string' ? loc.parse(location) : location)
  history.pushState(null, '', loc.stringify())
}

window.addEventListener('popstate', () => {
  loc.update(
    loc.parse(window.location.href.slice(window.location.origin.length))
  )
})
