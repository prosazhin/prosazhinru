import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
	Wrapper,
	Headline,
	Tags,
	Tabs,
	Selection,
} from '../../components'

import {
	pageSerializer,
	navigationsSerializer,
	tagsSerializer,
	selectionsSerializer,
	contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export default function Selections({ pageData, navigationsList, tagsList, selectionsList, contactsList }) {
	const [selections, setSelections] = useState(selectionsList)
	const router = useRouter()

	useEffect(() => {
		let dataSelections = [].concat(selectionsList)

		if (router.query.tag) {
			dataSelections = selectionsList.filter(selection => selection.tags.some(tag => tag.url === router.query.tag))
		}

		setSelections(dataSelections)
	}, [router.query.tag])

	console.log(selectionsList)

	return (
		<Wrapper
			navigations={navigationsList}
			contacts={contactsList}
			title={pageData.metaTitle}
			description={pageData.metaDescription}
			image="/sharing-selections.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
			<Headline
				title={pageData.title}
				description={pageData.description}
				h1
			/>
			<Tabs />
			<Tags
				tags={tagsList}
				page="selections"
			/>
			<div className={style.selections}>
				{selections.map(selection =>
					<Selection
						selection={selection}
						key={selection.id}
					/>
				)}
			</div>
		</Wrapper>
	)
}



export async function getStaticProps() {
	const pageResult = pageSerializer( await api.getOne('4FmC8blew6cpUdbOCZJjyK') )
	const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
	const tagsResult = tagsSerializer( await api.get({ content_type: 'tags', order: 'sys.createdAt' }) )
	const selectionsResult = selectionsSerializer( await api.get({ content_type: 'selections', order: 'sys.createdAt' }) )
	const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

	return {
		props: {
			pageData: pageResult,
			navigationsList: navigationsResult,
			tagsList: tagsResult,
			selectionsList: selectionsResult,
			contactsList: contactsResult,
		},
	}
}