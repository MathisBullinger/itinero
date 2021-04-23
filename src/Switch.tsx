import React from 'react'
import { matches } from './match'
import { useLocation } from './hooks'

const Switch: React.FC<{}> = ({ children }) => {
  const location = useLocation()

  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child) && matches(child.props, location))
      return React.cloneElement(child, { match: true })
  }
  return null
}

export default Switch
