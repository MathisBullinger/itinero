import { useLayoutEffect } from 'react'
import * as history from '../history'

export default ({ to }: { to: string }) => {
  useLayoutEffect(() => {
    history.push(to, { replace: true })
  }, [to])

  return null
}
