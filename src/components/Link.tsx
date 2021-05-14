import React from 'react'
import * as history from '../history'

type Props = {
  to: string
  newTab?: boolean
  sameTab?: boolean
}

const Link: React.FC<
  Omit<React.HTMLProps<HTMLAnchorElement>, 'href'> & Props
> = ({ children, to, newTab, sameTab, ...props }) => {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    history.push(to)
    cstClick?.(e)
  }

  const external = /^https?:\/\//.test(to)
  newTab ??= sameTab !== undefined ? !sameTab : external
  sameTab = !newTab

  const cstClick = props.onClick
  if (cstClick && !external) delete props.onClick

  return (
    <a
      href={to}
      {...(!external && { onClick: handleClick })}
      {...(newTab && { target: '_blank', rel: 'noopener' })}
      {...props}
    >
      {children}
    </a>
  )
}

export default Link
