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
    const selectionsResult = selectionsSerializer(await api.get('selections'))

    const paths = selectionsResult.map((selection) => ({
        params: { url: selection.url },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const navigationsResult = navigationsSerializer(await api.get('navigations'))
    const contactsResult = contactsSerializer(await api.get('contacts'))
    const selectionResult = selectionsSerializer(await api.get('selections', { 'fields.url': params.url }))[0]

    return {
        props: {
            navigationsList: navigationsResult,
            contactsList: contactsResult,
            selectionData: selectionResult,
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
