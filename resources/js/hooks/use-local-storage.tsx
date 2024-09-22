import { useEffect, useState } from 'react'

export default function useLocalStorage({ key, defaultValue }) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}

// import { useEffect, useState } from 'react'

// interface LocalStorageProps<T> {
//   key: string
//   defaultValue: T
// }

// export default function useLocalStorage<T>({
//   key,
//   defaultValue,
// }: LocalStorageProps<T>) {
//   const [value, setValue] = useState<T>(() => {
//     const storedValue = localStorage.getItem(key)
//     return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue
//   })

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value))
//   }, [value, key])

//   return [value, setValue] as const
// }
