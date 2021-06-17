import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import style from './styles.module.scss'
import Mixpanel from '../../utils/Mixpanel'
import method from '../../methods'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Headline,
} from '../../components'



export async function getStaticProps() {
    const pages = method.pages.serializer(await method.pages.getList(), 'about')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const jobs = method.jobs.serializer(await method.jobs.getList())
	const skills = method.skills.serializer(await method.skills.getList())

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            jobs: jobs,
            skills: skills,
		},
	}
}



export default function AboutPage({
    page,
    navigations,
    contacts,
    jobs,
    skills,
}) {
    const router = useRouter()

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_ABOUT_PAGE')

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-index.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        description={page.description}
                    />
                    <div className={style.competencies}>
                        <Link href="/competencies">
                            <a className={style.competencies__link}>
                                <span className={style.competencies__title}>
                                    Матрица компетенций продуктового дизайнера
                                </span>
                                <span className={style.competencies__description}>
                                    Для более полной и объективной оценки моих навыков, подготовил матрицу компетенций по материалам Юрия Ветрова.
                                </span>
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className={style.competencies__icon}
                                />
                            </a>
                        </Link>
                    </div>
                    {skills.sort(( a, b ) => a.order - b.order).map(skill =>
                        <section className={style.section} key={skill.id}>
                            <Headline
                                title={skill.title}
                                size="2"
                                hideMarginTop
                            />
                            <p className={style.section__description}>
                                {skill.description}
                            </p>
                            {skill.tools &&
                                <React.Fragment>
                                    <h5 className={`${style.section__description} ${style.section__description_title}`}>
                                        Инструменты
                                    </h5>
                                    <p className={style.section__description}>
                                        {skill.tools}
                                    </p>
                                </React.Fragment>
                            }
                        </section>
                    )}
                    <Headline
                        title="Где работал?"
                        size="1"
                    />
                    <article className={style.road}>
                        {jobs.sort(( a, b ) => b.order - a.order).map(job =>
                            <section className={style.road__item} key={job.id}>
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
                                    {job.date}
                                </p>
                                <p className={style.road__position}>
                                    {job.position}
                                </p>
                                <p className={style.road__description}>
                                    {job.description}
                                </p>
                            </section>
                        )}
                    </article>
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
