
import React from 'react'
import Link from 'next/link'
import { StaticTagsList } from '../'
import dayjs from 'dayjs'
import style from './Projects.module.scss'
import 'dayjs/locale/ru'



export default function Projects({ array }) {
    return (
        <ul className={style.projects}>
            {array.sort(( a, b ) => new Date(b.create) - new Date(a.create)).map(project =>
                <li className={style.project} key={project.id}>
                    <Link href={`/projects/${project.slug}`}>
                        <a className={style.project__link}>
                            <img
                                className={style.project__cover}
                                src={project.cover}
                                alt={project.title}
                            />
                            <span className={style.project__headline}>
                                {project.title}
                            </span>
                            <StaticTagsList
                                array={project.tags}
                            />
                            <span className={style.project__date}>
                                {dayjs(project.create).locale('ru').format('DD MMMM YYYY')}
                            </span>
                        </a>
                    </Link>
                </li>
            )}
        </ul>
    )
}