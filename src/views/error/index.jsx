import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

const ErrorPage = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>

          <h2 className='dark:text-gray-400'>We are sorry, page not found!</h2>
          <p className='mb-5 dark:text-gray-400'>The page you are looking for might have been removed or had its name changed or is temporarily unavailable</p>

          <NavLink to="/">Back To Homepage</NavLink>
        </div>
      </div>
    </>
  )
};

export default ErrorPage;