import { ContextProvider } from '../context'
import '../scss/global.scss'



export default function MyApp({ Component, pageProps }) {
    return(
        <ContextProvider>
            <Component { ...pageProps } />
        </ContextProvider>
    )
}