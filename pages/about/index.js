import React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import style from './styles.module.scss'

import {
    MainWrapper,
    PageHeadline,
    Headline,
    Container,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    jobsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()

import 'dayjs/locale/ru'



export async function getStaticProps() {
    const pagesResult = pagesSerializer(await api.get('pages'), 'about')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const jobsResult = jobsSerializer(await api.get('jobs'))

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
            jobsList: jobsResult,
		},
	}
}



export default function AboutPage({
    pageData,
    navigationsList,
    contactsList,
    jobsList,
}) {
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
                    {jobsList.sort(( a, b ) => b.order - a.order).map(job =>
                        <section className={style.road__item}>
                            <h3 className={style.road__title}>
                                {job.link ? 
                                    <a href={job.url} target="_blank">
                                        {job.title}
                                    </a>
                                    :
                                    <React.Fragment>
                                        {job.title}
                                    </React.Fragment>
                                }
                            </h3>
                            <p className={style.road__date}>
                                {dayjs(job.recruited).locale('ru').format('MMMM YYYY')} — {job.dismissal === null ? 'Сейчас' : `${dayjs(job.dismissal).locale('ru').format('MMMM YYYY')}`}
                            </p>
                            <p className={style.road__description}>
                                {job.position}
                                {job.description}
                            </p>
                        </section>
                    )}
                </article>
			</Container>
        </MainWrapper>
	)
}
