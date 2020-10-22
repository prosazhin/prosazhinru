import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './Tabs.module.scss'



export default function Tabs() {
    const router = useRouter()

    return (
        <React.Fragment>
            <div className={style.container}>
                <div className={style.tabs}>
                    <Link href="/links">
                        <a className={`${style.tabs__links}${router.pathname === '/links' ? ` ${style.tabs__links_active}` : ''}`}>
                            Cсылки
                        </a>
                    </Link>
                    <Link href="/selections">
                        <a className={`${style.tabs__links}${router.pathname === '/selections' ? ` ${style.tabs__links_active}` : ''}`}>
                            Подборки
                        </a>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}