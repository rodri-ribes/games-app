import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardGame from '../../components/CardGame/CardGame'
import { getDevelopers, getGames, getPlatforms, getStores } from '../../redux/features/data/dataSlice'
import style from './Home.module.scss'
import Spinner from '../../components/Spinner/Spinner.js'
import CardStore from '../../components/CardStore/CardStore'
import CardPlatform from '../../components/CardPlatform/CardPlatform'
import CardDeveloper from '../../components/CardDeveloper/CardDeveloper'


export default function Home() {

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGames(1))
        dispatch(getDevelopers(1))
        dispatch(getStores(1))
        dispatch(getPlatforms(1))
    }, [])

    let games = useSelector(state => state.data.games)
    let stores = useSelector(state => state.data.stores)
    let platforms = useSelector(state => state.data.platforms)
    let developers = useSelector(state => state.data.developers)

    return (
        <div className={style.container}>
            <h3>Last published Games</h3>
            <div className={style.container__section}>
                {
                    games?.results?.length > 0 ?
                        games?.results?.slice(0, 8).map(j => {
                            return (
                                <CardGame
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
            <h3>Last published Developers</h3>
            <div className={style.container__section}>
                {
                    developers?.results?.length > 0 ?
                        developers?.results?.slice(0, 8).map(j => {
                            return (
                                <CardDeveloper
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
            <h3>Last published Platforms</h3>
            <div className={style.container__section}>
                {
                    platforms?.results?.length > 0 ?
                        platforms?.results?.slice(0, 8).map(j => {
                            return (
                                <CardPlatform
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
            <h3>Last published Stores</h3>
            <div className={style.container__section}>
                {
                    stores?.results?.length > 0 ?
                        stores?.results?.slice(0, 8).map(j => {
                            return (
                                <CardStore
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

        </div>
    )
}
