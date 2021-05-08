import React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import style from './styles.module.scss'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    StaticTagsList,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    postsSerializer,
    postSerializer,
} from '../../serializers'

import API from '../../utils/Api'
const api = new API()

import 'dayjs/locale/ru'



export async function getStaticPaths() {
    const result = postsSerializer(await api.get('posts'))

    const paths = result.map((item) => ({
        params: { slug: item.slug },
    }))

    return {
        paths,
        fallback: false,
    }
}



export async function getStaticProps({ params }) {
    const pages = pagesSerializer(await api.get('pages'), 'posts')
	const contacts = contactsSerializer(await api.get('contacts'))
	const post = postSerializer(await api.get('posts', { 'fields.slug': params.slug }))[0]

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

    function getType(item, count, index) {
        switch(item.type) {
            case 'image':
                return (
                    <Container>
                        <img
                            className={
                                `${style.content__image}`+
                                `${index === 0 ? ` ${style.content__first_type}` : ''}`+
                                `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                            }
                            src={item.url}
                            alt={item.description}
                        />
                        <span className={style.content__image__description}>
                            {item.description}
                        </span>
                    </Container>
                )

            case 'heading':
                return (
                    <Container small>
                        <span className={
                            `${style.content__heading}`+
                            `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                        }>
                            {item.value}
                        </span>
                    </Container>
                )

            case 'paragraph':
                return (
                    <Container small>
                        <p className={
                            `${style.content__paragraph}`+
                            `${((count - 1) > index && post.content[index + 1].type === 'unordered-list') ? ` ${style.content__paragraph_above}` : ''}`+
                            `${((count - 1) > index && post.content[index + 1].type === 'ordered-list') ? ` ${style.content__paragraph_above}` : ''}`+
                            `${((count - 1) > index && post.content[index + 1].type === 'paragraph') ? ` ${style.content__paragraph_above}` : ''}`+
                            `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                        }>
                            {item.value}
                        </p>
                    </Container>
                )

            case 'code':
                return (
                    <Container small>
                        <p className={
                            `${style.content__code}`+
                            `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                        }>
                            {item.value}
                        </p>
                    </Container>
                )

            case 'blockquote':
                return (
                    <Container small>
                        <ul className={
                            `${style.content__blockquote}`+
                            `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                        }>
                            {item.value.map((valueItem, valueIndex) =>
                                <li
                                    key={`${item.type}__${valueIndex}`}
                                    className={style.content__blockquote__item}
                                >
                                    {valueItem}
                                </li>
                            )}
                        </ul>
                    </Container>
                )

            case 'ordered-list':
                return (
                    <Container small>
                        <ol type="1" className={
                            `${style.content__list} `+
                            `${style.content__list_ordered}`+
                            `${((count - 1) > index && post.content[index + 1].type === 'paragraph') ? ` ${style.content__list_above_paragraph}` : ''}`+
                            `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                        }>
                            {item.value.map((valueItem, valueIndex) =>
                                <li
                                    key={`${item.type}__${valueIndex}`}
                                    className={style.content__list__item}
                                >
                                    {valueItem}
                                </li>
                            )}
                        </ol>
                    </Container>
                )

            case 'unordered-list':
                return (
                    <Container small>
                        <ul className={
                            `${style.content__list} `+
                            `${style.content__list_unordered}`+
                            `${((count - 1) > index && post.content[index + 1].type === 'paragraph') ? ` ${style.content__list_above_paragraph}` : ''}`+
                            `${(count - 1) === index ? ` ${style.content__last_type}` : ''}`
                        }>
                            {item.value.map((valueItem, valueIndex) =>
                                <li 
                                    key={`${item.type}__${valueIndex}`}
                                    className={style.content__list__item}
                                >
                                    {valueItem}
                                </li>
                            )}
                        </ul>
                    </Container>
                )
        }
    }

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
                <div className={style.content}>
                    {post.content.map((item, index) =>
                        <React.Fragment key={`${item.type}__${index}`}>
                            {getType(item, post.content.length, index)}
                        </React.Fragment>
                    )}
                </div>
                <Container small>
                    <StaticTagsList
                        array={post.tags}
                        customClass={style.tags}
                    />
                    <span className={style.date}>
                        {dayjs(post.create).locale('ru').format('DD MMMM YYYY')}
                    </span>
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
