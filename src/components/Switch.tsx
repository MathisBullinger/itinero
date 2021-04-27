import React from 'react'
import { matchPath } from '../match'
import { useLocation } from '../hooks'
import Redirect from './Redirect'

const Switch: React.FC<{}> = ({ children }) => {
  const location = useLocation()

  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child)) {
      if (child.type === Redirect) return child
      const match = child.props.path && matchPath(child.props.path, location)
      if (match) return React.cloneElement(child, { match })
    }
  }
  return null
}

export default Switch
