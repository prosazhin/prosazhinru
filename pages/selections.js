import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '../styles/pages/selections.module.scss'

import {
	Wrapper,
	Headline,
	Tags,
	Tabs,
	Selection,
} from '../components'

import API from '../api'
const api = new API()



function Selections(props) {
	const [selections, setSelections] = useState(props.selections)
	const router = useRouter()

	useEffect(() => {
		let dataSelections = [].concat(props.selections)

		if (router.query.tag) {
			dataSelections = props.selections.filter(selection => selection.fields.tags.some(tag => tag.fields.url === router.query.tag))
		}

		setSelections(dataSelections)
	}, [router.query.tag])

	return (
		<Wrapper
			pages={props.pages}
			navigations={props.navigations}
			contacts={props.contacts}
			title={props.page.metaTitle}
			description={props.page.metaDescription}
			image="/sharing-selections.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<Headline
				title={props.page.title}
				description={props.page.description}
				h1
			/>
			<Tabs />
			<Tags
				tags={props.tags}
				page="selections"
			/>
			<div className={style.selections}>
				{selections.map(selection =>
					<Selection
						selection={selection}
						key={selection.sys.id}
					/>
				)}
			</div>
		</Wrapper>
	)
}



Selections.getInitialProps = async () => {
	const page = await api.getOne('4FmC8blew6cpUdbOCZJjyK')
	const pages = await api.get({ content_type: 'page', order: 'sys.createdAt' })
	const navigations = await api.get({ content_type: 'navigations' })
	const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })
	const tags = await api.get({ content_type: 'tags', order: 'sys.createdAt' })
	const selections = await api.get({ content_type: 'selections', order: 'sys.createdAt' })
	
	return {
		page: page.fields,
		pages: pages.items,
		contacts: contacts.items,
		tags: tags.items,
		selections: selections.items,
		navigations: navigations.items,
	}
}

export default Selections