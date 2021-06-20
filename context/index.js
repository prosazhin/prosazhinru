import { createContext, useContext, useState } from 'react'

const AppContext = createContext()



export function ContextProvider({ children }) {
    const [isActiveMenu, toggleActiveMenu] = useState(false)

    const state = {
        linksTabs: [
            {
                title: 'Ссылки',
                url: '/links',
            },
            {
                title: 'Подборки',
                url: '/selections',
            },
        ],
        aboutTabs: [
            {
                title: 'О себе',
                url: '/about',
            },
            {
                title: 'Компетенции',
                url: '/competencies',
            },
            {
                title: 'Работал',
                url: '/jobs',
            },
        ],
        isActiveMenu: isActiveMenu,
        toggleActiveMenu: () => toggleActiveMenu(!isActiveMenu),
    }

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}



export function useAppContext() {
    return useContext(AppContext)
}
