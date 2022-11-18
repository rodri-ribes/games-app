import React from 'react'
import style from './Card_developer.module.scss'
import { Link } from 'react-router-dom'

export default function Card_developer({ title, slug, image, games_count }) {
    return (
        <div className={style.container}>
            <div className={style.container__image}>
                <Link to={`/developer/${slug}`} className={style.container__image_img}>
                    <img src={image} alt={title} />
                </Link>
            </div>
            <div className={style.container__content}>
                <Link to={`/developer/${slug}`} className={style.container__content_title}>{title}</Link>
            </div>
            <div className={style.container__information}>
                <div className={style.container__information__group}>
                    <b>Published Games: </b>
                    <p> {games_count}</p>
                </div>
            </div>
        </div>
    )
}
