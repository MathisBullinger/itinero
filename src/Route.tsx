import React, { useState } from 'react'
import { matchPath, toRegex } from './match'
import { useLocation } from './hooks'
import type { Location } from './location'

type Props = {
  path: RegExp | string
  match?: RegExpExecArray
}

const Route: React.FC<Props> = ({ match, path, children }) => {
  const [regex] = useState(typeof path === 'string' ? toRegex(path) : path)
  const location = useLocation()
  const v = children && (match ?? matchPath(regex, location))
  if (!v) return null
  const props = { location, match: v.groups ?? {} }
  if (!Array.isArray(children)) return renderChild(children, props)
  return (children as any[]).map((child, key) =>
    renderChild(child, { key, ...props })
  )
}

const renderChild = (child: any, props?: any) =>
  typeof child === 'function' ? React.createElement(child, props) : child

export default Route

export type RouteProps<
  T extends Record<string, any> = {},
  TM extends Record<string, string> = any
> = T & {
  location: Location
  match: TM
}
