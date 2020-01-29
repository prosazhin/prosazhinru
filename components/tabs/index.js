import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './tabs.scss'



const Tabs = () => {
    const router = useRouter()

    return (
        <React.Fragment>
            <div className="container">
                <div className="tabs">
                    <Link href="/links">
                        <a className={`tabs__links` + `${router.pathname === '/links' ? ` tabs__links_active` : ''}`}>
                            Cсылки
                        </a>
                    </Link>
                    <Link href="/selections">
                        <a className={`tabs__links` + `${router.pathname === '/selections' ? ` tabs__links_active` : ''}`}>
                            Подборки
                        </a>
                    </Link>
                </div>
            </div>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Tabs