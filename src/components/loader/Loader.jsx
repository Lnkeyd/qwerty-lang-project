import React from 'react'
import { TbLoader } from 'react-icons/tb'
import styles from './loader.module.css'

const Loader = () => {
  return (
    <div>
        <TbLoader className={styles.loader}/>
    </div>
  )
}

export default Loader