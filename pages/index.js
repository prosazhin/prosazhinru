import React from 'react'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	MainContainer,
	PageHeadline,
	Headline,
	Selections,
	Links,
	Link,
	Card,
} from '../components'

import {
	pagesSerializer,
	selectionsSerializer,
	linksSerializer,
	contactsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pagesResult = pagesSerializer(await api.get('pages'), 'home')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const selectionsResult = selectionsSerializer(await api.get('selections', { limit: 1, include: 1 }))
	const linksResult = linksSerializer(await api.get('links', { limit: 10, include: 0 }))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			selectionsList: selectionsResult,
			linksList: linksResult,
		},
	}
}



export default function HomePage({
	pageData,
	navigationsList,
	selectionsList,
	linksList,
	contactsList,
}) {
	const router = useRouter()

	const data = [
		{
			year: '2020',
			data: []
				.concat(selectionsList.filter(item => item.type === 'selection'))
				.concat(linksList.filter(item => item.type === 'link'))
				.sort((a,b) => new Date(b.create) - new Date(a.create)),
		},
		{
			year: '2019',
			data: [],
		},
		{
			year: '2018',
			data: [],
		},
	]

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-index.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<MainContainer
				small
			>
				<PageHeadline
					description={pageData.description}
				/>
			</MainContainer>
			
			{/* {data.map(item =>
				<React.Fragment key={item.year}>
					<Headline title={item.year} />
					{item.data.map(item =>
						<React.Fragment key={item.id}>
							{item.type === 'link' &&
								<Link item={item} />
							}
							{item.type === 'selection' &&
								<Card
									key={item.id}
									item={item}
									linkUrl={`/selection/${item.url}`}
									linkTarger="_self"
									isShowTags={true}
									isBigSize={item.big}
								/>
							}
						</React.Fragment>
					)}
				</React.Fragment>
			)} 
			<Headline
				title="Новая подборка"
			/>
			<Selections
				array={selectionsList}
				isShowTags={true}
			/>
			<Headline
				title="Новые ссылки"
			/>
			<Links
				array={linksList}
			/>
			*/}
		</MainWrapper>
	)
}
