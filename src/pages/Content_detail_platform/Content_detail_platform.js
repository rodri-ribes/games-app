import React, { useEffect, useState } from 'react'
import style from './Content_detail_platform.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

const { REACT_APP_KEY } = process.env


export default function Content_detail_platform() {

    let { id } = useParams()
    const [platforms, setPlatforms] = useState(false)


    const getData = async (id) => {
        try {
            const data = await axios.get(`https://api.rawg.io/api/platforms/${id}?key=${REACT_APP_KEY?.slice(0, 33)}`)
            setPlatforms(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!platforms) getData(id)
    }, [])


    return (
        <>
            {
                platforms ?
                    <div className={style.container} style={{ backgroundImage: `url(${platforms?.image_background})` }}>
                        <div className={style.container__content}>
                            <h1>{platforms.name}</h1>
                            <p>
                                {
                                    platforms.description ? platforms.description.replace("<p>", "").replace("</p>", "") : "No description loaded "
                                }
                            </p>
                            <div>
                                <b>Supported Games: </b> <p>{platforms.games_count}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}
