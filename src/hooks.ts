import { useEffect, useReducer } from 'react'
import * as location from './location'
import type { Location } from './location'

export function useLocation(): location.Location {
  const [loc, setLoc] = useReducer(
    (cur: Location, updated: Location) =>
      Object.entries(updated).every(([k, v]) => (cur as any)[k] === v)
        ? cur
        : { ...updated },
    { ...location.default }
  )

  useEffect(() => {
    setLoc(location.default)
    return location.listen(() => {
      setLoc(location.default)
    })
  }, [])

  return loc
}
