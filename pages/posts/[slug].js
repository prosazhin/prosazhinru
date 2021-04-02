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

    // console.log(postData)
    // 0 {nodeType: "embedded-asset-block", content: [], data: Object}
    // 1 {nodeType: "paragraph", content: Array, data: {}}
    // 2 {nodeType: "blockquote", content: Array, data: {}}
    // 3 {nodeType: "heading-2", content: Array, data: {}}
    // 4 {nodeType: "paragraph", content: Array, data: {}}
    // 5 {nodeType: "heading-2", content: Array, data: {}}
    // 6 {nodeType: "unordered-list", content: Array, data: {}}
    // 7 {nodeType: "paragraph", content: Array, data: {}}
    // 8 {nodeType: "heading-2", content: Array, data: {}}
    // 9 {nodeType: "ordered-list", content: Array, data: {}}
    // 10 {nodeType: "heading-2", content: Array, data: {}}
    // 11 {nodeType: "paragraph", content: Array, data: {}}

    function getType(item, count, index) {
        if (item.nodeType === 'heading-2') {
            // console.log(item.nodeType, item)

            return (
                <Container small>
                    <span className={style.content__heading}>
                        {item.content[0].value}
                    </span>
                </Container>
            )
        }

        if (item.nodeType === 'paragraph') {
            // console.log(item.nodeType, item)

            return (
                <Container small>
                    <p className={`${style.content__paragraph}${(count - 1) === index ? ` ${style.content__paragraph_nomargin}` : ''}`}>
                        {item.content[0].value}
                    </p>
                </Container>
            )
        }

        if (item.nodeType === 'blockquote') {
            // console.log(item.nodeType, item)

            return (
                <Container small>
                    {item.content.map((blockquote, blockquoteIndex) =>
                        <span
                            key={`${blockquote.nodeType}__${blockquoteIndex}`}
                            className={style.content__blockquote}
                        >
                            {blockquote.content[0].value}
                        </span>
                    )}
                </Container>
            )
        }

        if (item.nodeType === 'ordered-list') {
            // console.log(item.nodeType, item)

            return (
                <Container small>
                    <ol type="1" className={`${style.content__list} ${style.content__list_ordered}`}>
                        {item.content.map((listItem, listIndex) =>
                            <li
                                key={`${listItem.nodeType}__${listIndex}`}
                                className={style.content__list__item}
                            >
                                {listItem.content[0].content[0].value}
                            </li>
                        )}
                    </ol>
                </Container>
            )
        }

        if (item.nodeType === 'unordered-list') {
            // console.log(item.nodeType, item)

            return (
                <Container small>
                    <ul className={`${style.content__list} ${style.content__list_unordered}`}>
                        {item.content.map((listItem, listIndex) =>
                            <li 
                                key={`${listItem.nodeType}__${listIndex}`}
                                className={style.content__list__item}
                            >
                                {listItem.content[0].content[0].value}
                            </li>
                        )}
                    </ul>
                </Container>
            )
        }

        if (item.nodeType === 'embedded-asset-block') {
            // console.log(item.nodeType, item)

            return (
                <Container>
                    <img
                        className={style.content__image}
                        src={item.data.target.fields.file.url}
                        alt={item.data.target.fields.description}
                    />
                    <span className={style.content__image__description}>
                        {item.data.target.fields.description}
                    </span>
                </Container>
            )
        }

        return true
    }


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
                <div className={style.content}>
                    {postData.content.map((item, index) =>
                        <React.Fragment key={`${item.nodeType}__${index}`}>
                            {getType(item, postData.content.length, index)}
                        </React.Fragment>
                    )}
                </div>
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
