import React from 'react'
import { matches } from './match'
import { useLocation } from './hooks'
import type { Location } from './location'

type Props = {
  path: RegExp
  match?: boolean
}

const Route: React.FC<Props> = ({ match, children, ...props }) => {
  const location = useLocation()
  if (!children || (!match && !matches(props, location))) return null
  if (!Array.isArray(children)) return renderChild(children, { location })
  return (children as any[]).map((child, key) =>
    renderChild(child, { key, location })
  )
}

const renderChild = (child: any, props?: any) =>
  typeof child === 'function' ? React.createElement(child, props) : child

export default Route

export type RouteProps<T extends Record<string, any> = {}> = T & {
  location: Location
}
