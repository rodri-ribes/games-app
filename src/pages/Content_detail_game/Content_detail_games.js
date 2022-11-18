import React, { useEffect, useState } from 'react'
import style from './Content_detail_games.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

// svg platforms

import { SiLinux, SiPlaystation, SiXbox, SiNintendo } from 'react-icons/si'
import { BsWindows, BsApple, BsPhoneFill } from 'react-icons/bs'

// material

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


export default function Content_detail_games() {

    let { id } = useParams()
    const [game, setGame] = useState(false)

    // show tags

    const [showTags, setShowTags] = useState(false)


    //read more requeriments

    const [readMoreMin, setreadMoreMin] = useState({
        long: 100,
        show: false
    })

    const [readMoreRec, setreadMoreRec] = useState({
        long: 100,
        show: false
    })

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



    const getData = async (id) => {
        try {
            const data = await axios.get(`https://api.rawg.io/api/games/${id}?key=78a77816307b4853af2ef2e542d5aa7d`)
            setGame(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!game) getData(id)
    }, [])


    return (
        <>
            {
                game ?
                    <div className={style.container} style={{ backgroundImage: `url(${game?.background_image_additional})` }}>
                        <div className={style.container__content}>
                            <div className={style.container__content__data}>
                                <div className={style.container__content__Section}>
                                    <div className={style.container__content__Section__genres}>
                                        {game?.genres?.map(g => {
                                            return (
                                                <p title={`Total Games ${g.games_count}`} key={g.id} className={style.container__content__Section__genres_genre}>{g.name}</p>
                                            )
                                        })}
                                    </div>
                                    <h1>{game?.name}</h1>
                                    <div className={style.container__content__Section__rating}>
                                        <Stack spacing={1}>
                                            <Rating name="half-rating-read" defaultValue={game?.rating} precision={0.5} readOnly />
                                        </Stack>
                                        <p className={style.container__content__Section__rating_rating}>{game?.rating}</p>
                                    </div>
                                    <img src={game?.background_image} alt={game?.name} />
                                    <button onClick={() => setShowTags(!showTags)} className={style.container__content__Section_ButtonTags} >Show Tags</button>
                                    {showTags &&
                                        <div className={style.container__content__Section__tags}>
                                            {game?.tags.map(t => {
                                                return (
                                                    <p title={`Total Games ${t?.games_count}`} key={t?.id} className={style.container__content__Section__tags_p}>{t?.name}</p>
                                                )
                                            })}
                                        </div>
                                    }
                                    <p className={style.container__content__Section_description}>{game?.description_raw}</p>
                                </div>

                                <div className={style.container__content__Section}>
                                    <h3>Platforms</h3>
                                    <div className={style.container__content__Section__platforms}>
                                        {
                                            game?.parent_platforms?.map(p => {
                                                return (
                                                    <div key={p.id} className={style.container__content__Section__platforms__containerPlatform}>
                                                        {platforms[p?.platform?.slug]}
                                                        <h4>{p?.platform?.name}</h4>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                </div>

                                <div className={style.container__content__Section}>
                                    <h3>Requirements</h3>
                                    {
                                        game?.platforms?.map(p => {
                                            if (p?.platform?.name === "PC")
                                                return (
                                                    <div key={p.id} className={style.container__content__Section__requirement}>
                                                        <div className={style.container__content__Section__requirement__card}>
                                                            <h4>Minimum</h4>
                                                            <p>
                                                                {
                                                                    p?.requirements?.minimum?.length > 0 ?
                                                                        p?.requirements?.minimum?.replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("Minimum:", "")
                                                                            .replace("OS:", "\n\nOS: ")
                                                                            .replace("Processor:", "\n\nProcessor: ")
                                                                            .replace("Memory:", "\n\nMemory: ")
                                                                            .replace("Graphics:", "\n\nGraphics: ")
                                                                            .replace("DirectX Version:", "\n\nDirectX Version: ")
                                                                            .replace("Network:", "\n\nNetwork: ")
                                                                            .replace("Storage:", "\n\nStorage: ")
                                                                            .replace("Sound Card:", "\n\nSound Card: ")
                                                                            .replace("Additional Notes:", "\n\nAdditional Notes: ")
                                                                            .replace("Hard Drive:", "\n\nHard Drive: ")
                                                                            .replace("Other requirements:", "\n\nOther requirements: ")
                                                                            .replace("Other Requirements:", "\n\nOther Requirements: ")
                                                                            .slice(0, readMoreMin.long)
                                                                        :
                                                                        "There are no minimum requirements"
                                                                }
                                                            </p>
                                                            {
                                                                p?.requirements?.minimum?.length > 0 ?
                                                                    readMoreMin.show ?
                                                                        <b onClick={() => setreadMoreMin({ long: 100, show: false })}>Read Less</b>
                                                                        :
                                                                        <b onClick={() => setreadMoreMin({ long: 1000, show: true })}>Read More</b>
                                                                    : null
                                                            }
                                                        </div>
                                                        <div className={style.container__content__Section__requirement__card}>
                                                            <h4>Recommended</h4>
                                                            <p>
                                                                {
                                                                    p?.requirements?.recommended?.length > 0 ?

                                                                        p?.requirements?.recommended?.replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("\n", "")
                                                                            .replace("Recommended:", "")
                                                                            .replace("OS:", "\n\nOS: ")
                                                                            .replace("Processor:", "\n\nProcessor: ")
                                                                            .replace("Memory:", "\n\nMemory: ")
                                                                            .replace("Graphics:", "\n\nGraphics: ")
                                                                            .replace("DirectX Version:", "\n\nDirectX Version: ")
                                                                            .replace("Network:", "\n\nNetwork: ")
                                                                            .replace("Storage:", "\n\nStorage: ")
                                                                            .replace("Sound Card:", "\n\nSound Card: ")
                                                                            .replace("Additional Notes:", "\n\nAdditional Notes: ")
                                                                            .replace("Hard Drive:", "\n\nHard Drive: ")
                                                                            .replace("Other requirements:", "\n\nOther requirements: ")
                                                                            .replace("Other Requirements:", "\n\nOther Requirements: ")
                                                                            .slice(0, readMoreRec.long)
                                                                        :
                                                                        "No requirements Recommended"
                                                                }
                                                            </p>
                                                            {
                                                                p?.requirements?.recommended?.length > 0 ?
                                                                    readMoreRec.show ?
                                                                        <b onClick={() => setreadMoreRec({ long: 100, show: false })}>Read Less</b>
                                                                        :
                                                                        <b onClick={() => setreadMoreRec({ long: 1000, show: true })}>Read More</b>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>

                                <div className={style.container__content__Section}>
                                    <h3>Publishers</h3>
                                    {
                                        game?.publishers?.map(p => {
                                            return (
                                                <div key={p?.id} className={style.container__content__Section__publishers}>
                                                    <h4>{p?.name}</h4>
                                                    <p>{p?.games_count} Games</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className={style.container__content__Section}>
                                    <h3>Developers</h3>
                                    {
                                        game?.developers?.map(p => {
                                            return (
                                                <div key={p?.id} className={style.container__content__Section__developers}>
                                                    <h4>{p?.name}</h4>
                                                    <p>{p?.games_count} Games</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={style.container__content__sidebar}>

                                <div className={style.container__content__sidebar__Section}>
                                    <h3>Stores</h3>
                                    <div className={style.container__content__sidebar__Section__contain}>
                                        {
                                            game?.stores?.map(s => {
                                                return (
                                                    <div key={s.id} style={{ backgroundImage: `url(${s?.store?.image_background})` }} className={style.container__content__sidebar__Section__stores}>
                                                        <h4>{s?.store?.name}</h4>
                                                        <div className={style.container__content__sidebar__Section__stores__contain}>
                                                            <a href={`https://${s?.store?.domain}`} target="_blank" rel="noreferrer">To Buy</a>
                                                            <p >{Intl.NumberFormat('de-DE').format(s?.store?.games_count)} Published</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}
