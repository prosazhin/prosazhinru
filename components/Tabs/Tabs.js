import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './Tabs.module.scss'



export default function Tabs({ array, customClass }) {
    const router = useRouter()

    const isActiveTab = (url) => {
        const result = router.pathname.search(url)
        return result === -1 ? false : true
    }

    return (
        <div className={`${style.tabs}${customClass ? ` ${customClass}` : ''}`}>
            {array.map(item => 
                <Link
                    href={item.url}
                    key={item.url}
                >
                    <a className={`${style.tabs__links}${isActiveTab(item.url) ? ` ${style.tabs__links_active}` : ''}`}>
                        {item.title}
                    </a>
                </Link>
            )}
        </div>
    )
}