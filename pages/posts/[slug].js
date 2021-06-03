import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'
import Mixpanel from '../../utils/Mixpanel'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    StaticTagsList,
    Content,
} from '../../components'

import {
    getPages,
    getContacts,
    getPosts,
    getPost,
} from '../../api/methods'



export async function getStaticPaths() {
    const result = await getPosts()

    const paths = result.map((item) => ({
        params: { slug: item.slug },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
    const pages = await getPages('posts')
	const contacts = await getContacts()
	const post = await getPost(params.slug)

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            post: post,
		},
	}
}



export default function PostPage({
    page,
    navigations,
    contacts,
    post,
}) {
    const router = useRouter()

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_POST_PAGE')

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={post.title}
			description={page.metaDescription}
			image="/sharing-posts.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={post.title}
                    />
                </Container>
                <Content
                    data={post}
                />
                <Container small>
                    <StaticTagsList
                        array={post.tags}
                        customClass={style.tags}
                    />
                    <span className={style.date}>
                        {post.createString}
                    </span>
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
