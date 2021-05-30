import React from 'react'
import { useRouter } from 'next/router'
import style from './styles.module.scss'

import {
    MainWrapper,
    MainContainer,
    Container,
    PageHeadline,
    Headline,
} from '../../components'

import {
    pagesSerializer,
    contactsSerializer,
    competenciesCategoriesSerializer,
} from '../../serializers'

import API from '../api/contentful'
const api = new API()



export async function getStaticProps() {
    const pages = pagesSerializer(await api.get('pages'), 'competencies')
	const contacts = contactsSerializer(await api.get('contacts'))
	const competenciesCategories = competenciesCategoriesSerializer(await api.get('competencies-categories'))
    

	return {
		props: {
            page: pages.page,
            navigations: pages.navigations,
            contacts: contacts,
            competenciesCategories: competenciesCategories,
		},
	}
}



export default function CompetenciesPage({
    page,
    navigations,
    contacts,
    competenciesCategories,
}) {
    const router = useRouter()

	return (
        <MainWrapper
            navigations={navigations}
			contacts={contacts}
			title={page.metaTitle}
			description={page.metaDescription}
			image="/sharing-competencies.jpg"
			url={router.asPath}
		>
            <MainContainer>
                <Container small>
                    <PageHeadline
                        title={page.title}
                        description={page.description}
                    />
                    <div className={style.about}>
                        <Headline
                            title="Уровни оценки навыков"
                            size="2"
                            hideMarginTop
                        />
                        <ul className={style.about__list}>
                            <li className={style.about__list__item}>
                                <span className={style.about__list__item__icon}>1</span>
                                <span className={style.about__list__item__title}>
                                    Осведомлённость
                                </span>
                                <span className={style.about__list__item__description}>
                                    Понимание того, как работает специалист в этой области. Какие задачи выполняет, каков рабочий процесс и инструментарий, методы и практики, какие особенности и ограничения накладываются на него.
                                </span>
                            </li>
                            <li className={style.about__list__item}>
                                <span className={style.about__list__item__icon}>2</span>
                                <span className={style.about__list__item__title}>
                                    Умение
                                </span>
                                <span className={style.about__list__item__description}>
                                    Способность решать базовые задачи в области. Доделать не очень важный кусок работ за ведущим специалистом, собрать макет или прототип на основе чужих наработок, внести осмысленные доработки в существующий документ и т.п.
                                </span>
                            </li>
                            <li className={style.about__list__item}>
                                <span className={style.about__list__item__icon}>3</span>
                                <span className={style.about__list__item__title}>
                                    Экспертиза
                                </span>
                                <span className={style.about__list__item__description}>
                                    Выполнение большинства задач в области знаний. От начала до конца и, зачастую, самостоятельно. Способность разобраться в нетипичной ситуации.
                                </span>
                            </li>
                            <li className={style.about__list__item}>
                                <span className={style.about__list__item__icon}>4</span>
                                <span className={style.about__list__item__title}>
                                    Лидерство
                                </span>
                                <span className={style.about__list__item__description}>
                                    Способность передать экспертизу другим участникам команды. Помощь в обучении и профессиональном росте коллег, развитии инструментария и методов работы, повышении общей дизайн-культуры. Возможность указать на проблемную ситуацию в проекте или процессе и помочь в её решении.
                                </span>
                            </li>
                        </ul>
                        <ul className={style.category}>
                            {competenciesCategories.sort(( a, b ) => a.order - b.order).map(category =>
                                <li className={style.category__item} key={category.id}>
                                    <span className={style.category__item__title}>
                                        {category.title}
                                    </span>
                                    <ul className={style.competencies}>
                                        {category.competencies.sort(( a, b ) => a.order - b.order).map(item =>
                                            <li className={style.competencies__item} key={item.id}>
                                                <span className={style.competencies__item__title}>
                                                    {item.title}
                                                </span>
                                                <span className={style.competencies__item__rating}>
                                                    {item.rating}
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </Container>
            </MainContainer>
        </MainWrapper>
	)
}
