import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStores } from '../../redux/features/data/dataSlice'
import style from './Stores.module.scss'
import Spinner from '../../components/Spinner/Spinner.js'
import db from '../../db.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import Card_store from '../../components/Card_store/Card_store'

export default function Stores() {

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStores(1))
    }, [])

    let stores = useSelector(state => state.data.stores)

    return (
        <div className={style.container}>
            <div className={style.container__sectionSliders}>
                {
                    stores?.results?.length > 0 ?
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
                            {stores?.results?.filter(r => r.games_count > 5000).map(j => {
                                return (
                                    <SwiperSlide key={j.id}>
                                        <Card_store
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
                        <Spinner key={45} />
                }
            </div>
            <div className={style.container__sectionTwo}>
                {
                    stores?.results?.length > 0 ?
                        stores?.results?.map(j => {
                            return (
                                <Card_store
                                    slug={j.slug}
                                    key={j.id}
                                    title={j.name}
                                    image={j.image_background}
                                    games_count={j.games_count}
                                />
                            )
                        })
                        :
                        <Spinner key={46} />
                }
            </div>

        </div>
    )
}
