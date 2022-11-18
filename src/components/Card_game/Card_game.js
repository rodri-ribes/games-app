import React, { useState } from 'react'
import style from './Card_game.module.scss'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'


// svg platforms

import { SiLinux, SiPlaystation, SiXbox, SiNintendo } from 'react-icons/si'
import { BsWindows, BsApple, BsPhoneFill } from 'react-icons/bs'


export default function Card_game({ id, title, image, object, rating, release, genres, rating_top, ratings_count, kickList }) {


    let platforms = {
        pc: <BsWindows />,
        playstation: <SiPlaystation />,
        linux: <SiLinux />,
        mac: <BsApple />,
        ios: <BsApple />,
        android: <BsPhoneFill />,
        xbox: <SiXbox />,
        nintendo: <SiNintendo />,
    }

    return (
        <div className={style.container} >
            <div className={style.container__image}>
                <Link to={`/game/${object?.slug}`} className={style.container__image_img}>
                    <img src={image} alt={title} />
                </Link>
            </div>
            <div className={style.container__content}>
                <div className={style.container__content__platforms}>
                    {
                        object.parent_platforms.map(p => {
                            return <div key={p.id}>{platforms[p.platform.slug]}</div>
                        })
                    }

                </div>
                <Link to={`/game/${object?.slug}`} className={style.container__content_title}>{title}</Link>
            </div>
            <div className={style.container__information}>
                <div className={style.container__information__group}>
                    <b>Release date: </b>
                    <p> {release}</p>
                </div>
                <div className={style.container__information__group}>
                    <b>Rating: </b>
                    <p>{rating} / {rating_top}</p>
                </div>
                <div className={style.container__information__group}>
                    <b>Genres: </b>
                    <p> {genres[0]?.name}{genres[1] && ","} {genres[1]?.name}</p>
                </div>
            </div>
        </div>
    )
}
