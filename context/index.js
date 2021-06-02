import { createContext, useContext } from 'react'

const AppContext = createContext()



export function ContextProvider({ children }) {

    let state = {
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
