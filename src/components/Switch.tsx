import React from 'react'
import { Matcher } from '../match'
import { useLocation } from '../hooks'
import Redirect from './Redirect'

const Switch: React.FC<{}> = ({ children }) => {
  const location = useLocation()

  const childList = React.Children.toArray(children)
    .filter(React.isValidElement)
    .filter(({ props }) => 'path' in (props as any))

  for (const child of childList) {
    if (child.type === Redirect) return child
    const match = new Matcher((child.props as any).path).match(location)
    if (match) return React.cloneElement(child as any, { match })
  }
  return null
}

export default Switch
