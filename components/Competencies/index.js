import React from 'react'
import style from './Container.module.scss'

export function Competencies() {
    return (
        <div className={style.competencies}>
            <Link href="/competencies">
                <a className={style.competencies__link}>
                    <span className={style.competencies__title}>
                        Матрица компетенций продуктового дизайнера
                    </span>
                    <span className={style.competencies__description}>
                        Для более полной и объективной оценки моих навыков, подготовил матрицу компетенций по материалам Юрия Ветрова.
                    </span>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className={style.competencies__icon}
                    />
                </a>
            </Link>
        </div>
    )
}