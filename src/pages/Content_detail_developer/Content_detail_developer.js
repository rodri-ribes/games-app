import React, { useEffect, useState } from 'react'
import style from './Content_detail_developer.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

const { REACT_APP_KEY } = process.env

export default function Content_detail_developer() {

    let { id } = useParams()
    const [developer, setDeveloper] = useState(false)


    const getData = async (id) => {
        try {
            const data = await axios.get(`https://api.rawg.io/api/developers/${id}?key=${REACT_APP_KEY?.slice(0, 33)}`)
            setDeveloper(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!developer) getData(id)
    }, [])


    return (
        <>
            {
                developer ?
                    <div className={style.container} style={{ backgroundImage: `url(${developer?.image_background})` }}>
                        <div className={style.container__content}>
                            <h1>{developer.name}</h1>
                            <p>
                                {
                                    developer.description ? developer.description.replace("<p>", "").replace("</p>", "") : "No description loaded "
                                }
                            </p>
                            <div>
                                <b>Published Games: </b> <p>{developer.games_count}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}
