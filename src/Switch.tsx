import React from 'react'
import { matchPath } from './match'
import { useLocation } from './hooks'

const Switch: React.FC<{}> = ({ children }) => {
  const location = useLocation()

  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child)) {
      const match = child.props.path && matchPath(child.props.path, location)
      if (match) return React.cloneElement(child, { match })
    }
  }
  return null
}

export default Switch
