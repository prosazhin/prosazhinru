import Document, { Html, Head, Main, NextScript } from 'next/document'



class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="ru">
                <Head />
                <body>
                    <Main />
                    <NextScript />

                    {/* <!-- Yandex.Metrika counter --> */}
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(43442274, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, trackHash:true });`}} />
                    <noscript dangerouslySetInnerHTML={{ __html: `<div><img src="https://mc.yandex.ru/watch/43442274" style="position:absolute; left:-9999px;" alt="" /></div>`}} />

                    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-115946402-1" />
                    <script dangerouslySetInnerHTML={{ __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-115946402-1');
                    `}} />
                </body>
            </Html>
        )
    }
}

export default MyDocument