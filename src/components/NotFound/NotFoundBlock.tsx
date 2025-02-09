import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
    return <div className={styles.notFound_content}>
        <p>Hmmmmmm</p>
        <h1>Ничего не найдено</h1>
    </div>
}

export default NotFoundBlock