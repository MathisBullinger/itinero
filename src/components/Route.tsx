import React, { useMemo } from 'react'
import { Matcher } from '../match'
import { useLocation } from '../hooks'
import type { Location } from '../location'
import SearchParams, { ParamObj } from '../url/searchParams'

type Props = {
  path: RegExp | string
  match?: Record<string, string> | null
}

const Route: React.FC<Props> = ({ match, path, children }) => {
  const matcher = useMemo(() => new Matcher(path), [path])
  const location = useLocation()
  match ??= matcher.match(location)
  if (!match || !children) return null
  const props = {
    location,
    match,
    query: new SearchParams(location.search).content,
  }
  if (!Array.isArray(children)) return renderChild(children, props)
  return (children as any[]).map((child, key) =>
    renderChild(child, { key, ...props })
  )
}

const renderChild = (child: any, props?: any) =>
  typeof child === 'function' ||
  (typeof child === 'object' && !React.isValidElement(child))
    ? React.createElement(child, props)
    : child

export default Route

export type RouteProps<
  T extends Record<string, any> = {},
  TM extends Record<string, string> = any
> = T & {
  location: Location
  match: TM
  query: ParamObj
}
