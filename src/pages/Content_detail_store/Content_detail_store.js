import React, { useEffect, useState } from 'react'
import style from './Content_detail_store.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'


export default function Content_detail_store() {

    let { id } = useParams()
    const [store, setStore] = useState(false)


    const getData = async (id) => {
        try {
            const data = await axios.get(`https://api.rawg.io/api/stores/${id}?key=78a77816307b4853af2ef2e542d5aa7d`)
            setStore(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!store) getData(id)
    }, [])


    return (
        <>
            {
                store ?
                    <div className={style.container} style={{ backgroundImage: `url(${store?.image_background})` }}>
                        <div className={style.container__content}>
                            <h1>{store.name}</h1>
                            <p>
                                {
                                    store.description ? store.description.replace("<p>", "").replace("</p>", "") : "No description loaded "
                                }
                            </p>
                            <div>
                                <b>Published Games: </b> <p>{store.games_count}</p>
                            </div>
                        </div>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}
