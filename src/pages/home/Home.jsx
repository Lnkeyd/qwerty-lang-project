import React, { useReducer } from 'react'
import Loader from '../../components/loader/Loader'
import styles from './home.module.css'

const Home = () => {

  const initialState = {
    loading: false,
    posts: {},
    error: false,
  }

  const myReduser = (state, action) => {
    switch (action.type) {
      case "FETCH_START": 
        return {
          loading: true,
          posts: {},
          error: false,
      }
      case "FETCH_SUCCESS":
        return {
          loading: false,
          posts: action.payload,
          error: false,
        }
      case "FETCH_ERROR":
        return {
          loading: false,
          posts: {},
          error: true,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(myReduser, initialState)

  const handleFetch = () => {
    dispatch({type: "FETCH_START"})
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => dispatch({type: "FETCH_SUCCESS", payload: data}))
    .catch(err => dispatch({type: "FETCH_ERROR"}))
  }

  return (
    <div className={styles.template}>
      <h2>Here you go when you trying to fetch all the data!</h2>
      <button onClick={() => handleFetch()}>fetch data</button>
      {
        state.loading &&
        <Loader/>
      }
      <article>
        <h3>{state.posts ? state.posts.title : ''}</h3>
        <p>{state.posts ? state.posts.body : ''}</p>
      </article>
      <span>{state.error && 'Some error occures...'}</span>
    </div>
  )
}

export default Home