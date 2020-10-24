import React from 'react'
import { useRouter } from 'next/router'
import style from './index.module.scss'

import {
	MainWrapper,
	Headline,
	ButtonLink,
	Blog,
	Link,
	Container,
} from '../components'

import {
	pageSerializer,
	navigationsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export default function Home({ pageData, navigationsList, linksList, contactsList }) {
	const router = useRouter()

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-index.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<Container small>
				<Headline description={pageData.description} />
				<Blog />
			</Container>
			<Headline title="Последние ссылки" />
			<div className={style.links}>
				{linksList.map(link =>
					<Link
						link={link}
						key={link.id}
						tags
					/>
				)}
			</div>
			<div className={style.button_wrapper}>
				<ButtonLink
					title="Все ссылки"
					url="/links"
					target="_self"
				/>
			</div>
		</MainWrapper>
	)
}



export async function getStaticProps() {
	const pageResult = pageSerializer( await api.getOne('22ziEi9xaIBiXD6mZ56r21') )
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const linksResult = linksSerializer( await api.get({ content_type: 'links', limit: 10, }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			linksList: linksResult,
			contactsList: contactsResult,
		},
	}
}