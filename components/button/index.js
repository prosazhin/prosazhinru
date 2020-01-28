import React from 'react'
import style from './button.scss'



const ButtonLink = ({ title, url, target, customClass }) => {
    return (
        <React.Fragment>
            <div className="wrapper">
                <a
                    href={url}
                    // eslint-disable-next-line
                    target={target}
                    className={`button` + `${customClass ? ` ${customClass}`: ''}`}
                >
                    {title}
                </a>
            </div>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default ButtonLink