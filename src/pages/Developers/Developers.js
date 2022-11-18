import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDevelopers } from '../../redux/features/data/dataSlice'
import style from './Developers.module.scss'
import Spinner from '../../components/Spinner/Spinner.js'
import { useSearchParams } from 'react-router-dom'
import db from '../../db.json';
import Card_developer from '../../components/Card_developer/Card_developer'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

export default function Developers() {

    let dispatch = useDispatch()

    let [params, setParams] = useSearchParams()

    //logic of pagination

    if (parseInt(params.get("page")) == null) {
        setParams({
            page: 1
        })
        dispatch(getDevelopers(1))
    }

    const changePage = (e) => {

        if (typeof e === "number") {
            if (e >= 1 && e <= 5000) {
                setParams({
                    page: `${e}`
                })
            }
        } else if (e?.target?.value >= 1 && e?.target?.value <= 5000) {
            setParams({
                page: `${e.target.value}`
            })
        }
    }

    useEffect(() => {

        if (parseInt(params.get("page")) >= 1 && parseInt(params.get("page")) <= 5000) {
            dispatch(getDevelopers(params.get("page")))
        } else if (!parseInt(params.get("page"))) {
            dispatch(getDevelopers(1))
        }
    }, [params.get("page")])

    let developers = useSelector(state => state.data.developers)

    return (
        <div className={style.container}>
            <div className={style.container__sectionSliders}>
                {
                    db?.developers?.length > 0 ?
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, A11y, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation={true}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                "delay": 2000,
                                "disableOnInteraction": false
                            }}
                        >
                            {db?.developers?.filter(r => r.games_count > 100).map(j => {
                                return (
                                    <SwiperSlide key={j.id}>
                                        <Card_developer
                                            slug={j.slug}
                                            key={j.id}
                                            title={j.name}
                                            image={j.image_background}
                                            games_count={j.games_count}
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        :
                        <Spinner />
                }
            </div>
            <div className={style.container__sectionTwo}>
                {
                    developers?.results?.length > 0 ?
                        developers?.results?.map(j => {
                            return (
                                <Card_developer
                                    slug={j.slug}
                                    key={j.id}
                                    title={j.name}
                                    image={j.image_background}
                                    games_count={j.games_count}
                                />
                            )
                        })
                        :
                        <Spinner />
                }
            </div>
            <div className={style.container__pagination}>
                <button onClick={() => changePage(!parseInt(params.get("page")) ? 1 - 1 : parseInt(params.get("page")) - 1)} className={style.container__pagination_link}>Previus</button>
                <input type="number" value={!parseInt(params.get("page")) ? "1" : parseInt(params.get("page"))} onChange={e => changePage(e)} />
                <button onClick={() => changePage(!parseInt(params.get("page")) ? 1 + 1 : parseInt(params.get("page")) + 1)} className={style.container__pagination_link}>Next</button>
            </div>
        </div>
    )
}
