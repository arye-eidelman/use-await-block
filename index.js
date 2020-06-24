import { useState, useEffect } from 'react'

export default function useAwaitBlock(promise) {
  const [internalPromise, setInternalPromise] = useState(promise)
  const [promiseCounter, setPromiseCounter] = useState(0)
  const [state, setState] = useState(promise ? "pending" : null)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (internalPromise) {
      internalPromise.then((promiseIndex => value => {
        if (promiseIndex === promiseCounter) {
          setValue(value)
          setState("fulfilled")
        }
      })(promiseCounter))

      internalPromise.catch((promiseIndex => error => {
        if (promiseIndex === promiseCounter) {
          setError(error)
          setState("rejected")
        }
      })(promiseCounter))
    }
  }, [internalPromise])

  function awaitBlock({ pending, fulfilled, rejected }) {
    switch (state) {
      case "pending": return pending ? pending() : null
      case "fulfilled": return fulfilled ? fulfilled(value) : null
      case "rejected": return rejected ? rejected(error) : null
      default: return null
    }
  }

  function setPromise(promise) {
    setPromiseCounter(promiseCounter + 1)
    setInternalPromise(promise)
    setState(promise ? "pending" : null)
    setValue(null)
    setError(null)
  }

  return [awaitBlock, setPromise]
}
