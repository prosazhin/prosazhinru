import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
    MainWrapper,
    PageHeadline,
    Links,
} from '../../components'

import {
    navigationsSerializer,
    selectionsSerializer,
    contactsSerializer,
} from '../../utils/Serializers'

import API from '../../utils/Api'
const api = new API()



export async function getStaticPaths() {
    const selectionsResult = selectionsSerializer( await api.get({ content_type: 'selections', order: 'sys.createdAt' }) )

    const paths = selectionsResult.map((selection) => ({
        params: { url: selection.url },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const navigationsResult = navigationsSerializer( await api.get({ content_type: 'navigations' }) )
    const selectionResult = selectionsSerializer( await api.get({ content_type: 'selections', order: 'sys.createdAt', 'fields.url': params.url }) )[0]
    const contactsResult = contactsSerializer( await api.get({ content_type: 'contacts', order: 'sys.createdAt' }) )

    return {
        props: {
            navigationsList: navigationsResult,
            selectionData: selectionResult,
            contactsList: contactsResult,
        },
    }
}



export default function SelectionPage({ navigationsList, selectionData, contactsList, }) {
    const router = useRouter()

    return (
        <MainWrapper
            navigations={navigationsList}
            contacts={contactsList}
            title={selectionData.title}
            description={selectionData.description}
            image="/sharing-selections.jpg"
            url={`https://prosazhin.ru` + `${router.pathname}`}
        >
            <PageHeadline
                title={selectionData.title}
                description={selectionData.description}
            />
            <Links
				array={selectionData.links}
                tags={false}
                customClass={style.links}
			/>
        </MainWrapper>
    )
}
