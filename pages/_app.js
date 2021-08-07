import Head from 'next/head'
import { ContextProvider } from '../context'
import '../scss/global.scss'



export default function MyApp({ Component, pageProps }) {
    return(
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<meta name="theme-color" content="#f2f3f4" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="robots" content="index,follow" />
				<meta name="googlebot" content="index,follow" />
				<meta name="google" content="notranslate" />
				<meta name="yandex-verification" content="dd48801ed051b178" />
				<meta name="google-site-verification" content="oXkccV9eEltz10YzICaE33ZUFtjof1E4fFLFE4EgW-0" />
			</Head>
			<ContextProvider>
				<Component { ...pageProps } />
			</ContextProvider>
		</>
    )
}
