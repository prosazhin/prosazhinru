import React from 'react'
import { useRouter } from 'next/router'
import style from '../styles/pages/index.module.scss'

import {
	Wrapper,
	Headline,
	ButtonLink,
	Blog,
	Link,
} from '../components'

import API from '../api'
const api = new API()



function Home(props) {
	const router = useRouter()

	return (
		<Wrapper
			pages={props.pages}
			navigations={props.navigations}
			contacts={props.contacts}
			title={props.page.metaTitle}
			description={props.page.metaDescription}
			image="/sharing-index.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<Headline description={props.page.description} />
			<Blog />
			<Headline title="Последние ссылки" />
			<div className={style.links}>
				{props.links.map(link =>
					<Link
						link={link}
						key={link.sys.id}
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
		</Wrapper>
	)
}



Home.getInitialProps = async () => {
	const page = await api.getOne('22ziEi9xaIBiXD6mZ56r21')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const navigations = await api.get({ content_type: 'navigations' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	const links = await api.get({ content_type: 'links', limit: 10, })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		links: links.items,
		navigations: navigations.items,
	}
}

export default Home