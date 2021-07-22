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
    Headline,
	Tabs,
} from '../../components'



export async function getServerSideProps(context) {
    const pages = method.pages.serializer(await method.pages.getList(), 'about')
	const contacts = method.contacts.serializer(await method.contacts.getList())
	const skills = method.skills.serializer(await method.skills.getList())

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            skills: skills,
		}
	}
}



export default function AboutPage({
    page,
    navigations,
    contacts,
    skills,
}) {
    const router = useRouter()
    const context = useAppContext()

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_ABOUT_PAGE')
    

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-about.jpg"
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
                        description={page.description}
                    />
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
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
