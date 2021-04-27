export type ParamObj = Record<string, string | number | undefined | null>

export const merge = (
  a: string | URLSearchParams | ParamObj,
  b: string | URLSearchParams | ParamObj = location.search
): URLSearchParams => {
  const params = cloneParams(b)
  for (const [k, v] of cloneParams(a).entries()) params.set(k, v)
  return params
}

const cloneParams = (v: string | URLSearchParams | ParamObj) =>
  new URLSearchParams(v as any)
