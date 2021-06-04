import React from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import Mixpanel from '../utils/Mixpanel'
import method from '../api/methods'

import {
	MainWrapper,
	MainContainer,
	Container,
	PageHeadline,
	Years,
} from '../components'



export async function getStaticProps() {
	const pages = getPages.serializer(await getPages.fetch, 'home')
	const contacts = await getContacts()
	const jobs = await getJobs()
	const links = await getLinks()
	const selections = await getSelections()
	const posts = await getPosts()
	const projects = await getProjects()

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

	// Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_MAIN_PAGE')

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
