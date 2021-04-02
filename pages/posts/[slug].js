import React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import style from './styles.module.scss'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    StaticTag,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    postsSerializer,
    postSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()

import 'dayjs/locale/ru'



export async function getStaticPaths() {
    const postsResult = postsSerializer(await api.get('posts'))

    const paths = postsResult.map((post) => ({
        params: { slug: post.slug },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
    const pagesResult = pagesSerializer(await api.get('pages'), 'posts')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const postResult = postSerializer(await api.get('posts', { 'fields.slug': params.slug }))[0]

	return {
		props: {
            pageData: pagesResult.page,
            navigationsList: pagesResult.navigations,
            contactsList: contactsResult,
            postData: postResult,
		},
	}
}



export default function PostsPage({
    pageData,
    navigationsList,
    contactsList,
    postData,
}) {
    const router = useRouter()

    console.log(postData)

	return (
        <MainWrapper
            navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-about.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={postData.title}
                    />
                </Container>
                <Container small>
                    <ul className={style.tags}>
                        {postData.tags.map(tag =>
                            <li
                                className={style.tags__item}
                                key={tag}
                            >
                                <StaticTag
                                    title={tag}
                                    url={false}
                                />
                            </li>
                        )}
                    </ul>
                    <span className={style.date}>
                        {dayjs(postData.create).locale('ru').format('DD MMMM YYYY')}
                    </span>
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
