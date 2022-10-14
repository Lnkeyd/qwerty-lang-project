import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineLanguage } from 'react-icons/hi2'
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <HiOutlineLanguage/>
      </Link>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link to="/about">
            About
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/word-of-the-day">
            Word of the Day
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/sets">
            Study Sets
          </Link>
        </li>
      </ul>
      <div className={styles.login}>Login</div>
    </nav>
  )
}

export default Navbar