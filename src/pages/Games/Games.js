import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card_game from '../../components/Card_game/Card_game'
import { getGames } from '../../redux/features/data/dataSlice'
import style from './Games.module.scss'
import Spinner from '../../components/Spinner/Spinner.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import db from '../../db.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';

export default function Games() {

    let dispatch = useDispatch()

    let [params, setParams] = useSearchParams()

    //logic of pagination

    if (parseInt(params.get("page")) == null) {
        setParams({
            page: 1
        })
        dispatch(getGames(1))
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
            dispatch(getGames(params.get("page")))
        } else if (!parseInt(params.get("page"))) {
            dispatch(getGames(1))
        }
    }, [params.get("page")])

    let games = useSelector(state => state.data.games)

    return (
        <div className={style.container}>
            <div className={style.container__sectionSliders}>
                {
                    db?.games?.length > 0 ?
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
                            {db?.games?.filter(r => r.rating > 4.40).map(j => {
                                return (
                                    <SwiperSlide key={j.id}>
                                        <Card_game
                                            id={j.id}
                                            title={j.name}
                                            image={j.background_image}
                                            object={j}
                                            release={j.released}
                                            genres={j.genres}
                                            ratings_count={j.ratings_count}
                                            rating={j.rating}
                                            rating_top={j.rating_top}
                                            key={j.id}

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
                    games?.results?.length > 0 ?
                        games?.results?.map(j => {
                            return (
                                <Card_game
                                    id={j.id}
                                    title={j.name}
                                    image={j.background_image}
                                    object={j}
                                    release={j.released}
                                    genres={j.genres}
                                    ratings_count={j.ratings_count}
                                    rating={j.rating}
                                    rating_top={j.rating_top}
                                    key={j.id}

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
