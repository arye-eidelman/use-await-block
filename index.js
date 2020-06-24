import { useState } from 'react'

export default function usePromiseRenderer(promise) {
  const [internalPromise, setInternalPromise] = useState(promise)
  const [state, setState] = useState("pending")
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)


  internalPromise.then(value => {
    setValue(value)
    setState("fulfilled")
  })

  internalPromise.catch(error => {
    setError(error)
    setState("rejected")
  })

  function promiseRenderer({ pending, fulfilled, rejected }) {
    switch (state) {
      case "pending": return pending ? pending() : null
      case "fulfilled": return fulfilled ? fulfilled(value) : null
      case "rejected": return rejected ? rejected(error) : null
      default: return null
    }
  }

  function setPromise(promise) {
    setInternalPromise(promise)
    setState("pending")
    setValue(null)
    setError(null)
  }

  return [promiseRenderer, setPromise]
}
