import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from './selections.module.scss'

import {
    Wrapper,
    Headline,
    Link,
} from '../../components'

import {
	navigationsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export default function PageSelection(props) {
    const [selection, setSelection] = useState(null)
    const router = useRouter()

    useEffect(() => {
		setSelection(props.selections.filter(item => item.fields.url === router.query.slug)[0])
	})
    
    return (
        <Wrapper
            navigations={props.navigations}
			contacts={props.contacts}
			title={selection ? `${props.page.metaTitle} — ${selection.fields.title}` : props.page.metaTitle}
			description={selection ? selection.fields.description : props.page.metaDescription}
			image="/sharing-selections.jpg"
			url={`https://prosazhin.ru` + `${router.pathname}`}
		>
            {selection &&
                <React.Fragment>
                    <Headline
                        title={selection ? selection.fields.title : ''}
                        description={selection ? selection.fields.description : ''}
                        h1
                    />
                    <div className={style.links}>
                        {selection.fields.links.map(link =>
                            <Link
                                link={link}
                                key={link.sys.id}
                            />
                        )}
                    </div>
                </React.Fragment>
            }
        </Wrapper>
    )
}



export async function getStaticProps() {
	const page = await api.getOne('4FmC8blew6cpUdbOCZJjyK')
    const navigations = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
    const selections = await api.get({ content_type: 'selections', order: 'sys.createdAt' })
    const contacts = await api.get({ content_type: 'contacts', order: 'sys.createdAt' })

	return {
		props: {
			page: page.fields,
            navigations: navigations,
            selections: selections.items,
            contacts: contacts.items,
		},
	}
}