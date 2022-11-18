import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlatforms } from '../../redux/features/data/dataSlice'
import style from './Platforms.module.scss'
import Spinner from '../../components/Spinner/Spinner.js'
import { useSearchParams } from 'react-router-dom'
import db from '../../db.json';
import Card_platform from '../../components/Card_platform/Card_platform'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

export default function Platforms() {

    let dispatch = useDispatch()

    let [params, setParams] = useSearchParams()

    //logic of pagination

    if (parseInt(params.get("page")) == null) {
        setParams({
            page: 1
        })
        dispatch(getPlatforms(1))
    }

    const changePage = (e) => {

        if (typeof e === "number") {
            if (e >= 1 && e <= 3) {
                setParams({
                    page: `${e}`
                })
            }
        } else if (e?.target?.value >= 1 && e?.target?.value <= 3) {
            setParams({
                page: `${e.target.value}`
            })
        }
    }

    useEffect(() => {

        if (parseInt(params.get("page")) >= 1 && parseInt(params.get("page")) <= 3) {
            dispatch(getPlatforms(params.get("page")))
        } else if (!parseInt(params.get("page"))) {
            dispatch(getPlatforms(1))
        }
    }, [params.get("page")])

    let platforms = useSelector(state => state.data.platforms)

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
                            {platforms?.results?.filter(r => r.games_count > 5000).map(j => {
                                return (
                                    <SwiperSlide key={j.id}>
                                        <Card_platform
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
                    platforms?.results?.length > 0 ?
                        platforms?.results?.map(j => {
                            return (
                                <Card_platform
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
