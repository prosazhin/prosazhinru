import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context'
import style from './styles.module.scss'
import Mixpanel from '../../utils/Mixpanel'
import method from '../../methods'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Tabs,
} from '../../components'



export async function getServerSideProps(context) {
    const pages = method.pages.serializer(await method.pages.getList(), 'jobs')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const jobs = method.jobs.serializer(await method.jobs.getList())

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            jobs: jobs,
		}
	}
}



export default function AboutPage({
    page,
    navigations,
    contacts,
    jobs,
}) {
    const router = useRouter()
    const context = useAppContext()

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_JOBS_PAGE')

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-jobs.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <Tabs
						array={context.aboutTabs}
						customClass={style.tabs}
					/>
                    <PageHeadline
                        title={page.title}
                    />
                    <article className={style.road}>
                        {jobs.sort(( a, b ) => b.order - a.order).map(job =>
                            <section className={style.road__item} key={job.id}>
                                <h3 className={style.road__title}>
                                    {job.link ? 
                                        <a href={job.url} target="_blank" rel="noreferrer">
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
