export type Location = {
  path: string
  hash: string
  search: string
}

const location: Location = {
  path: window.location.pathname || '/',
  hash: window.location.hash,
  search: window.location.search,
}

export default location

export const update = (loc: Partial<Location>) => {
  loc = nonEmpty(loc)
  if ('path' in loc && !loc.path!.startsWith('/')) loc.path = '/' + loc.path
  Object.assign(location, loc)
  for (const { cb } of listeners) cb()
}

export const parse = (url: string): Partial<Location> => {
  const parts = url.split(/(?=[?#])/)
  return nonEmpty({
    path: parts.find(v => !/[?#]/.test(v)),
    search: parts.find(v => v.startsWith('?')),
    hash: parts.find(v => v.startsWith('#')),
  })
}

export const stringify = ({
  path,
  search,
  hash,
}: Partial<Location> = location): string =>
  (path || '/') + (search || '') + (hash || '')

const nonEmpty = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))

type Listener = { cb(): any }
const listeners: Listener[] = []

export const listen = (cb: () => any) => {
  const listener = { cb }
  listeners.push(listener)
  return () => {
    const i = listeners.indexOf(listener)
    if (i >= 0) listeners.splice(i, 1)
  }
}
