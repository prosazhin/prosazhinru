import { createContext, useContext, useState } from 'react'

const AppContext = createContext()



export function ContextProvider({ children }) {
    const [isActiveMenu, toggleActiveMenu] = useState(false)

    const state = {
        tabs: [
            {
                title: 'Ссылки',
                url: '/links',
            },
            {
                title: 'Подборки',
                url: '/selections',
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
