import React from 'react'
import Mixpanel from '../utils/Mixpanel'

import {
	MainContainer,
	Container,
	PageHeadline,
} from '../components'



export default function Custom500() {

    // Отправляю событие про отправку страницы
	Mixpanel.event('LOADING_500_ERROR_PAGE')

    const text = {
        title: 'Произошла ошибка'
    }

    return (
        <MainContainer>
            <Container small>
                <PageHeadline
                    title={text.title}
                />
            </Container>
        </MainContainer>
    )
}
