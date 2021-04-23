import { useState, useEffect } from 'react'
import * as location from './location'

export function useLocation(): location.Location {
  const [loc, setLoc] = useState({ ...location.default })

  useEffect(
    () =>
      location.listen(() => {
        setLoc({ ...location.default })
      }),
    []
  )

  return loc
}
