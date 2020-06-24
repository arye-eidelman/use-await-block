import React, { useEffect } from 'react'
import usePromiseRenderer from 'use-promise-renderer'

function fetchPosts() {
  if (Math.random() < 0.25) {
    return fetch("https://failedpromise.typicode.com/posts")
      .then(response => response.json())
  } else {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
  }
}

function Posts() {
  const [postsPromiseRenderer, setPostsPromise] = usePromiseRenderer(null)

  function reload() {
    setPostsPromise(fetchPosts())
  }

  useEffect(reload, [])

  return (
    <div>
      {postsPromiseRenderer({
        pending: () => <p>Loading...</p>,
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
        rejected: error => <p> Something went wrong ({error.toString()}) <button onClick={reload}> Retry </button> </p>,
      })}
    </div>
  )
}

export default Posts