import React from 'react'
import style from './container.scss'



const Container = ({ children, main }) => {
    return (
        <React.Fragment>
            {main ?
                <main className="container main">
                    {children}
                </main>
            :
                <div className="container">
                    {children}
                </div>
            }

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Container