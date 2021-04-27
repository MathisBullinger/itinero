export const omit = <T, K extends keyof T>(obj: T, ...keys: K[]) =>
  Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keys.includes(k as K))
  ) as Omit<T, K>
