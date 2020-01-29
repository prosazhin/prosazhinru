import React from 'react'
import Link from 'next/link'
import Tag from '../tag'
import style from './selection.scss'



const Selection = ({ selection }) => {

    function linksCount(count) {
        function declOfNum(number, titles) {  
            const cases = [2, 0, 1, 1, 1, 2]
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]
        }

        return `${count} ${declOfNum(count, ['ссылка', 'ссылки', 'ссылок'])}`
    }

    return (
        <React.Fragment>
            <Link href="/[slug]" as={`/` + `${selection.fields.url}`}>
                <a className={`selection` + `${selection.fields.big ? ` selection_size_big`: ''}`}>
                    <span className={`headline` + `${selection.fields.big ? ` headline_size_big`: ''}`}>
                        {selection.fields.title}
                    </span>

                    {selection.fields.description &&
                        <span className={`description` + `${selection.fields.big ? ` description_size_big`: ''}`}>
                            {selection.fields.description}
                        </span>
                    }

                    <div className="bottom">
                        <span className="count">
                            {linksCount(selection.fields.links.length)}
                        </span>
                        <ul className="tags">
                            {selection.fields.tags.map(tag =>
                                <li
                                    className="tags__item"
                                    key={tag.sys.id}
                                >
                                    <Tag
                                        title={tag.fields.title}
                                        url={tag.fields.url}
                                        page="selections"
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </a>
            </Link>

            <style jsx>{style}</style>
        </React.Fragment>
    )
}

export default Selection