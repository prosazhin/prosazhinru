import Document, { Html, Head, Main, NextScript } from 'next/document'



class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="ru">
                <Head>
                    <link href="/favicon.png" rel="icon" type="image/png" />
                    <link href="/favicon.png" rel="icon" type="image/png" sizes="192x192" />
                    <link href="/favicon.png" rel="apple-touch-icon" type="image/png" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
