import React from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	Years,
} from '../components'

import {
	pagesSerializer,
	contactsSerializer,
	jobsSerializer,
	linksSerializer,
	selectionsSerializer,
	postsSerializer,
} from '../utils/Serializers'

import API from '../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pagesResult = pagesSerializer(await api.get('pages'), 'home')
	const contactsResult = contactsSerializer(await api.get('contacts'))
	const jobsResult = jobsSerializer(await api.get('jobs'))
	const linksResult = linksSerializer(await api.get('links', { limit: 500, include: 0 }))
	const selectionsResult = selectionsSerializer(await api.get('selections'))
	const postsResult = postsSerializer(await api.get('posts'))

	return {
		props: {
			pageData: pagesResult.page,
			navigationsList: pagesResult.navigations,
			contactsList: contactsResult,
			jobsList: jobsResult,
			linksList: linksResult,
			selectionsList: selectionsResult,
			postsList: postsResult,
		},
	}
}



export default function HomePage({
	pageData,
	navigationsList,
	contactsList,
	jobsList,
	linksList,
	selectionsList,
	postsList,
}) {
	const router = useRouter()

	function workNow(item, year) {
		if (!item.dismissal && dayjs(item.recruited).format('YYYY') < year) {
			return true
		}

		if (dayjs(item.dismissal).format('YYYY') > year && dayjs(item.recruited).format('YYYY') < year) {
			return true
		}

		return false
	}

	const yearsList = [
		{
			title: 2021,
			titleString: '2021',
		},
		{
			title: 2020,
			titleString: '2020',
		},
		{
			title: 2019,
			titleString: '2019',
		},
		{
			title: 2018,
			titleString: '2018',
		},
		{
			title: 2017,
			titleString: '2017',
		},
	]

	yearsList.forEach(year => {
		year.job = {
			hired: jobsList.filter(item => dayjs(item.recruited).format('YYYY') === year.titleString)[0] || false,
			fired: jobsList.filter(item => dayjs(item.dismissal).format('YYYY') === year.titleString)[0] || false,
			work: jobsList.filter(item => workNow(item, year.titleString))[0] || false,
		}

		year.links = linksList.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
		year.selections = selectionsList.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
		year.posts = postsList.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
	})

	return (
		<MainWrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-index.jpg"
			url={router.asPath}
		>
			<MainContainer>
				<Container small>
					<PageHeadline
						description={pageData.description}
					/>
					<Years
						array={yearsList}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
