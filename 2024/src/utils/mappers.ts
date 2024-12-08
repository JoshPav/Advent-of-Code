
type Getter<T, K extends keyof T> = (obj: T) => T[K]

export const get = <T, K extends keyof T> (key: K): Getter<T, K> => (obj: T) => obj[key]