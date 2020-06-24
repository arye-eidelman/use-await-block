import React from 'react'
import usePromiseRenderer from './index.js' // from 'use-promise-renderer'

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
  const [postsPromiseRenderer, setPostsPromise] = usePromiseRenderer(fetchPosts())

  function reload() {
    setPostsPromise(fetchPosts())
  }

  return (
    <div>
      {postsPromiseRenderer({
        pending: () => <p>Spinner here</p>,
        fulfilled: posts => (
          <>
            <button onClick={reload}> Refresh </button>
            <ul>
              {posts.map(post => (
                <li> <a href={`/posts/${post.id}`}> {post.title} </a> </li>
              ))}
            </ul>
          </>
        ),
        rejected: error => <p> Something went wrong ({error}) <button onClick={reload}> Retry </button> </p>,
      })}
    </div>
  )
}

export default Posts