import React from 'react'
import { useRouter } from 'next/router'
import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Container from '../components/container'
import Headline from '../components/headline'
import Blog from '../components/blog'
import GlobalStyle from '../styles/base.scss'
import style from '../styles/about.scss'

import API from '../api'
const api = new API()



const About = (props) => {
    const router = useRouter()

	return (
		<React.Fragment>
			<Head
				title={props.page.metaTitle}
                description={props.page.metaDescription}
                image="/sharing-about.jpg"
                url={`https://prosazhin.ru` + `${router.pathname}`}
			/>
			<Header pages={props.pages} />
			<Container main>
				<Headline description={props.page.description} />
                <Blog />
				<article className="row">
                    <section>
                        <h3 className="title">
                            Дизайн
                        </h3>
                        <p className="description">
                            Проектирование и прототипирование интерфейсов<br />
                            на основе анализа пользовательского опыта или гипотез.<br />
                            Создание и поддержка дизайн системы.
                        </p>
                        <h5 className="description_title">
                            Инструменты
                        </h5>
                        <p className="description">
                            Figma, Abode CC, Miro,<br />
                            Notion, Jira, Trello
                        </p>
                    </section>
                    <section>
                        <h3 className="title">
                            Фронтенд
                        </h3>
                        <p className="description">
                            JavaScript, React / Redux, Vue, Angular.<br />
                            Разработка и поддержка: логики на клиенте,<br />
                            взаимодействия с api, библиотеки компонентов.
                        </p>
                        <h5 className="description_title">
                            Инструменты
                        </h5>
                        <p className="description">
                            Терминал, VSCode, Git, Npm, Yarn, NodeJS,<br />
                            Webpack, Grunt, Gilp, Docker
                        </p>
                    </section>
                    <section>
                        <h3 className="title">
                            Верстка
                        </h3>
                        <p className="description">
                            HTML, Семантический HTML, BEM,<br />
                            CSS, Less, SCSS, PostCSS, Mobile first.<br />
                            Адаптивная / кроссбраузерная верстка.
                        </p>
                    </section>
                </article>
				<Headline title="Где работал?" />
                <article className="road">
                    <section className="road__item">
                        <span className="road__icon road__icon_state_active"></span>
                        <h3 className="road__title">
                            <a href="https://www.reg.ru/" target="_blank">reg.ru</a>
                        </h3>
                        <p className="road__date">
                            Октябрь 2018 — Сейчас
                        </p>
                        <p className="road__description">
                            UX дизайнер / фронтендер<br />
                            Проектирование и разработка внутренних проектов.<br />
                            Поддержка и развития сервиса.
                        </p>
                    </section>
                    <section className="road__item">
                        <span className="road__icon"></span>
                        <h3 className="road__title">
                            <a href="https://supl.biz/" target="_blank">supl.biz</a>
                        </h3>
                        <p className="road__date">
                            Октябрь 2016 — Октябрь 2018
                        </p>
                        <p className="road__description">
                            Дизайнер / фронтендер<br />
                            Проектирование и разработка площадки<br />
                            и внутренних проектов компании.
                        </p>
                    </section>
                    <section className="road__item">
                        <span className="road__icon"></span>
                        <h3 className="road__title">
                            <a href="http://franbazar.com/" target="_blank">franbazar.com</a>
                        </h3>
                        <p className="road__date">
                            Май 2016 — Октябрь 2016
                        </p>
                        <p className="road__description">
                            Дизайнер / верстальщик<br />
                            Поддержка старых проектов.<br />
                            Дизайн и верстка мобильных приложений на WebView.
                        </p>
                    </section>
                    <section className="road__item">
                        <span className="road__icon"></span>
                        <h3 className="road__title">
                            <a href="https://pixlpark.ru/" target="_blank">pixlpark.ru</a>
                        </h3>
                        <p className="road__date">
                            Ферваль 2014 — Май 2016
                        </p>
                        <p className="road__description">
                            Дизайнер / верстальщик<br />
                            Поддержка демо сайта и админки.<br />
                            Помощь новым и постоянным клиентам.
                        </p>
                    </section>
                    <section className="road__item">
                        <span className="road__icon"></span>
                        <h3 className="road__title">
                            Фриланс и типографии
                        </h3>
                        <p className="road__date">
                            2011 — 2014
                        </p>
                        <p className="road__description">
                            Дизайнер<br />
                            Верстка книг, газет и журналов. Графический дизайн.<br />
                            Рекламная полиграфия.
                        </p>
                    </section>
                </article>
			</Container>
			<Footer contacts={props.contacts} />

			<style jsx>{GlobalStyle}</style>
			<style jsx>{style}</style>
		</React.Fragment>
	)
}

About.getInitialProps = async () => {
	const page = await api.getOne('3JFErwJlyqQQvqF77kZ2K9')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
	}
}

export default About