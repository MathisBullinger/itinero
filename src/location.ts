import type SearchParams from './url/searchParams'

export type Location = {
  path: string
  hash: string
  search: string
  previous: null | string
}

const location: Location = {
  path: window.location.pathname || '/',
  hash: window.location.hash,
  search: window.location.search,
  previous: null,
}

export default location

export type LocationInput = Partial<
  Omit<Location, 'search'> & {
    search: string | SearchParams
  }
>

export const update = (loc: LocationInput) => {
  loc = nonEmpty(loc)
  if (typeof loc.search === 'object') loc.search = loc.search.toString()
  prefix(loc, 'path', '/')
  prefix(loc, 'hash', '#')
  if (loc.search) prefix(loc, 'search', '?')
  loc.previous = stringify(location)
  Object.assign(location, loc)
  for (const { cb } of listeners) cb()
}

const prefix = <T>(obj: T, key: keyof T, prefix: string) => {
  if (typeof obj[key] === 'string' && !(obj[key] as any).startsWith(prefix))
    obj[key] = (prefix + obj[key]) as any
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
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '')
  )

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
