import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
        <a href='https://github.com/Lnkeyd' rel="noreferrer" target="_blank">
            <AiFillGithub className={styles.icon}/>
        </a>
        <p className={styles.text}>© 2022 Evgeniy Kozlov. All Rights Reserved.</p>
    </div>
  )
}

export default Footer