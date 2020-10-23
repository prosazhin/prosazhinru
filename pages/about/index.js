import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
    Wrapper,
    Headline,
    Blog,
} from '../../components'

import {
    pageSerializer,
    navigationsSerializer,
    contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export default function About({ pageData, navigationsList, contactsList }) {
    const router = useRouter()

	return (
        <Wrapper
            navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-about.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
            <Headline description={pageData.description} />
            <Blog />
            <article className={style.row}>
                <section>
                    <h3 className={style.title}>
                        Дизайн
                    </h3>
                    <p className={style.description}>
                        Проектирование и прототипирование интерфейсов<br />
                        на основе анализа пользовательского опыта или гипотез.<br />
                        Создание и поддержка дизайн системы.
                    </p>
                    <h5 className={style.description_title}>
                        Инструменты
                    </h5>
                    <p className={style.description}>
                        Figma, Abode CC, Miro,<br />
                        Notion, Jira, Trello
                    </p>
                </section>
                <section>
                    <h3 className={style.title}>
                        Фронтенд
                    </h3>
                    <p className={style.description}>
                        JavaScript, React / Redux, Vue, Angular.<br />
                        Разработка и поддержка: логики на клиенте,<br />
                        взаимодействия с api, библиотеки компонентов.
                    </p>
                    <h5 className={style.description_title}>
                        Инструменты
                    </h5>
                    <p className={style.description}>
                        Терминал, VSCode, Git, Npm, Yarn, NodeJS,<br />
                        Webpack, Grunt, Gilp, Docker
                    </p>
                </section>
                <section>
                    <h3 className={style.title}>
                        Верстка
                    </h3>
                    <p className={style.description}>
                        HTML, Семантический HTML, BEM,<br />
                        CSS, Less, SCSS, PostCSS, Mobile first.<br />
                        Адаптивная / кроссбраузерная верстка.
                    </p>
                </section>
            </article>
            <Headline title="Где работал?" />
            <article className={style.road}>
                <section className={style.road__item}>
                    <span className={`${style.road__icon} ${style.road__icon_state_active}`}></span>
                    <h3 className={style.road__title}>
                        <a href="https://www.reg.ru/" target="_blank">reg.ru</a>
                    </h3>
                    <p className={style.road__date}>
                        Октябрь 2018 — Сейчас
                    </p>
                    <p className={style.road__description}>
                        UX дизайнер / фронтендер<br />
                        Проектирование и разработка внутренних проектов.<br />
                        Поддержка и развития сервиса.
                    </p>
                </section>
                <section className={style.road__item}>
                    <span className={style.road__icon}></span>
                    <h3 className={style.road__title}>
                        <a href="https://supl.biz/" target="_blank">supl.biz</a>
                    </h3>
                    <p className={style.road__date}>
                        Октябрь 2016 — Октябрь 2018
                    </p>
                    <p className={style.road__description}>
                        Дизайнер / фронтендер<br />
                        Проектирование и разработка площадки<br />
                        и внутренних проектов компании.
                    </p>
                </section>
                <section className={style.road__item}>
                    <span className={style.road__icon}></span>
                    <h3 className={style.road__title}>
                        <a href="http://franbazar.com/" target="_blank">franbazar.com</a>
                    </h3>
                    <p className={style.road__date}>
                        Май 2016 — Октябрь 2016
                    </p>
                    <p className={style.road__description}>
                        Дизайнер / верстальщик<br />
                        Поддержка старых проектов.<br />
                        Дизайн и верстка мобильных приложений на WebView.
                    </p>
                </section>
                <section className={style.road__item}>
                    <span className={style.road__icon}></span>
                    <h3 className={style.road__title}>
                        <a href="https://pixlpark.ru/" target="_blank">pixlpark.ru</a>
                    </h3>
                    <p className={style.road__date}>
                        Ферваль 2014 — Май 2016
                    </p>
                    <p className={style.road__description}>
                        Дизайнер / верстальщик<br />
                        Поддержка демо сайта и админки.<br />
                        Помощь новым и постоянным клиентам.
                    </p>
                </section>
                <section className={style.road__item}>
                    <span className={style.road__icon}></span>
                    <h3 className={style.road__title}>
                        Фриланс и типографии
                    </h3>
                    <p className={style.road__date}>
                        2011 — 2014
                    </p>
                    <p className={style.road__description}>
                        Дизайнер<br />
                        Верстка книг, газет и журналов. Графический дизайн.<br />
                        Рекламная полиграфия.
                    </p>
                </section>
            </article>
        </Wrapper>
	)
}



export async function getStaticProps() {
	const pageResult = pageSerializer( await api.getOne('3JFErwJlyqQQvqF77kZ2K9') )
    const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
            pageData: pageResult,
            navigationsList: navigationsResult,
            contactsList: contactsResult,
		},
	}
}