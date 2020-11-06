import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
    MainWrapper,
    PageHeadline,
    Headline,
    Blog,
    Container,
} from '../../components'

import {
    pagesSerializer,
    navigationsSerializer,
    contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pageResult = pagesSerializer( await api.get({ content_type: 'page', 'fields.slug': 'about' }) )[0]
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



export default function AboutPage({ pageData, navigationsList, contactsList }) {
    const router = useRouter()

	return (
        <MainWrapper
            navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-about.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
            <PageHeadline
                description={pageData.description}
            />
            <Container small>
                <section className={style.section}>
                    <Headline
                        title="Дизайн"
                    />
                    <p className={style.section__description}>
                        Проектирование и прототипирование интерфейсов 
                        на основе анализа пользовательского опыта или гипотез. 
                        Создание и поддержка дизайн системы.
                    </p>
                    <h5 className={`${style.section__description} ${style.section__description_title}`}>
                        Инструменты
                    </h5>
                    <p className={style.section__description}>
                        Figma, Abode CC, Miro, Notion, Jira, Trello
                    </p>
                </section>
                <section className={style.section}>
                    <Headline
                        title="Фронтенд"
                        hideMarginTop
                    />
                    <p className={style.section__description}>
                        JavaScript, React / Redux, Vue, Angular. 
                        Разработка и поддержка: логики на клиенте, 
                        взаимодействия с api, библиотеки компонентов.
                    </p>
                    <h5 className={`${style.section__description} ${style.section__description_title}`}>
                        Инструменты
                    </h5>
                    <p className={style.section__description}>
                        Терминал, VSCode, Git, Npm, Yarn, NodeJS, 
                        Webpack, Grunt, Gilp, Docker
                    </p>
                </section>
                <section className={style.section}>
                    <Headline
                        title="Верстка"
                        hideMarginTop
                    />
                    <p className={style.section__description}>
                        HTML, Семантический HTML, BEM, 
                        CSS, Less, SCSS, PostCSS, Mobile first. 
                        Адаптивная / кроссбраузерная верстка.
                    </p>
                </section>

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
			</Container>
        </MainWrapper>
	)
}
