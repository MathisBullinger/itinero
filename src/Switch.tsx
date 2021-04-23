import React from 'react'
import * as route from './utils/route'

const Switch: React.FC<{}> = ({ children }) => {
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child) && route.matches(child.props))
      return React.cloneElement(child, { match: true })
  }
  return null
}

export default Switch
