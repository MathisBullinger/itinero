import React from 'react'
import * as history from '../history'

type Props = {
  to: string
}

const Link: React.FC<
  Omit<React.HTMLProps<HTMLAnchorElement>, 'href'> & Props
> = ({ children, to, ...props }) => {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    history.push(to)
  }

  return (
    <a {...props} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Link
