import React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import style from './styles.module.scss'

import {
    MainWrapper,
    MainContainer,
    PageHeadline,
    Headline,
    Container,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    jobsSerializer,
    skillsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()

import 'dayjs/locale/ru'



export async function getStaticProps() {
    const pagesResult = pagesSerializer(await api.get('pages'), 'about')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const jobsResult = jobsSerializer(await api.get('jobs'))
	const skillsResult = skillsSerializer(await api.get('skills'))

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
            jobsList: jobsResult,
            skillsList: skillsResult,
		},
	}
}



export default function AboutPage({
    pageData,
    navigationsList,
    contactsList,
    jobsList,
    skillsList,
}) {
    const router = useRouter()

	return (
        <MainWrapper
            navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-about.jpg"
			url={router.asPath}
		>
            <MainContainer
				small
			>
                <PageHeadline
                    description={pageData.description}
                />
                {skillsList.sort(( a, b ) => a.order - b.order).map(skill =>
                    <section className={style.section} key={skill.id}>
                        <Headline
                            title={skill.title}
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
                <Headline title="Где работал?" />
                <article className={style.road}>
                    {jobsList.sort(( a, b ) => b.order - a.order).map(job =>
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
                                {dayjs(job.recruited).locale('ru').format('MMMM YYYY')} — {job.dismissal === null ? 'Сейчас' : `${dayjs(job.dismissal).locale('ru').format('MMMM YYYY')}`}
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
            </MainContainer>
        </MainWrapper>
	)
}
