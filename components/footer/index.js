import React from 'react'
import Container from '../container'
import style from './footer.scss'



const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container>
                    <ul className="contacts">
                        <li className="contacts__item">
                            <a
                                href="mailto:prosazhin@ya.ru"
                                target="_self"
                            >
                                prosazhin@ya.ru
                            </a>
                        </li>
                        <li className="contacts__item">
                            <a
                                href="https://t.me/prosazhin"
                                // eslint-disable-next-line
                                target="_blank"
                            >
                                Телеграм
                            </a>
                        </li>
                        <li className="contacts__item">
                            <a
                                href="https://vk.com/prosazhin"
                                // eslint-disable-next-line
                                target="_blank"
                            >
                                Вконтакте
                            </a>
                        </li>
                    </ul>
                    <span className="copyright">
                        © 2017 - 2019, Евгений Сажин
                    </span>
                </Container>
            </footer>

            <style jsx>{style}</style>
        </React.Fragment>
        
    )
}

export default Footer