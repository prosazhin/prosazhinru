import React from 'react'
import Container from '../container'
import style from './footer.scss'



const Footer = (props) => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container>
                    <ul className="contacts">
                        {props.contacts.length && props.contacts.map(contact =>
                            <li className="contacts__item" key={contact.sys.id}>
                                <a
                                    href={contact.fields.url}
                                    target={contact.fields.target}
                                >
                                    {contact.fields.title}
                                </a>
                            </li>
                        )}
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