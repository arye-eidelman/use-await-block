# use-await-block

A Svelte inspired technique for rendering a promise based on it's state.

Svelte's [await blocks](https://svelte.dev/tutorial/await-blocks) are one of Svelte's really enjoyable features. I've attempted to recreate this using react hooks.

## Usage

```javascript
import React, { useEffect } from 'react'
import useAwaitBlock from 'use-await-block'

function Posts() {

  // The first value - awaitBlock - is used to render based on the promises state.
  //   It takes an object with three functions `{ pending, fulfilled, rejected }`.
  //   Any one of these can be ommited. if there is no function for the promises state it'll just render null.
  //   it will render pending the first run even if the promise is already fulfilled.
  //   it will render null if the promise is null or undefined.

  // The second value - setPromise - is used to change what promise is being rendered.
  //   it takes a promise or null.
  const [postsAwaitBlock, setPostsPromise] = useAwaitBlock(null)

  function reload() {
    setPostsPromise(fetchPosts())
  }

  useEffect(reload, [])

  return (
    <div>
      {postsAwaitBlock({
        pending: () => <p>Loading...</p>,

        // fullfiled is called with the fullfiled value from the promise.
        fulfilled: posts => (
          <>
            <button onClick={reload}> Refresh </button>
            <ul>
              {posts.map(post => (
                <li key={post.id}> <a href={`/posts/${post.id}`}> {post.title} </a> </li>
              ))}
            </ul>
          </>
        ),

        // rejected is called with the error value from the promise.
        rejected: error => <p> Something went wrong ({error.toString()}) <button onClick={reload}> Retry </button> </p>,
      })}
    </div>
  )
}
```

## Demo

A working demo can be found in the [demo folder](/demo) with the relevant code being at [/demo/src/Posts.js](/demo/src/Posts.js).
