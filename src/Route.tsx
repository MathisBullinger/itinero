import React from 'react'
import * as route from './utils/route'

type Props = {
  path: RegExp
  match?: boolean
}

const Route: React.FC<Props> = ({ match, children, ...props }) => {
  if (!children || (!match && !route.matches(props))) return null
  if (!Array.isArray(children)) return renderChild(children)
  return (children as any[]).map((child, key) => renderChild(child, { key }))
}

const renderChild = (child: any, props?: any) =>
  typeof child === 'function' ? React.createElement(child, props) : child

export default Route
