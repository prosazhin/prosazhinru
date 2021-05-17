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
	projectsSerializer,
} from '../serializers'

import API from '../utils/Api'
const api = new API()



export async function getStaticProps() {
	const pages = pagesSerializer(await api.get('pages'), 'home')
	const contacts = contactsSerializer(await api.get('contacts'))
	const jobs = jobsSerializer(await api.get('jobs'))
	const links = linksSerializer(await api.get('links', { limit: 500, include: 0 }))
	const selections = selectionsSerializer(await api.get('selections'))
	const posts = postsSerializer(await api.get('posts'))
	const projects = projectsSerializer(await api.get('projects'))

	return {
		props: {
			page: pages.page,
			navigations: pages.navigations,
			contacts: contacts,
			jobs: jobs,
			links: links,
			selections: selections,
			posts: posts,
			projects: projects,
		},
	}
}



export default function HomePage({
	page,
	navigations,
	contacts,
	jobs,
	links,
	selections,
	posts,
	projects,
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
			hired: jobs.filter(item => dayjs(item.recruited).format('YYYY') === year.titleString)[0] || false,
			fired: jobs.filter(item => dayjs(item.dismissal).format('YYYY') === year.titleString)[0] || false,
			work: jobs.filter(item => workNow(item, year.titleString))[0] || false,
		}

		year.links = links.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
		year.selections = selections.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
		year.posts = posts.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
		year.projects = projects.filter(item => dayjs(item.create).format('YYYY') === year.titleString)
	})

	return (
		<MainWrapper
			navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-index.jpg"
			url={router.asPath}
		>
			<MainContainer>
				<Container small>
					<PageHeadline
						description={page.description}
					/>
					<Years
						array={yearsList}
					/>
				</Container>
			</MainContainer>
		</MainWrapper>
	)
}
