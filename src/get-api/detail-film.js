import { useState, useEffect } from 'react';
import axios from 'axios'
export default function Detailfilm(id, pn) {
    let url = `https://api.themoviedb.org/3/movie/${id}`
    let apikey = "c5644ed3dcdd41ce81c890ef53c713c7"
    let [loading, setLoading] = useState(true)
    let [film, setFilm] = useState([])



    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            url: url,
            params: { api_key: apikey },
        }).then(res => {
            if (res.status === 200) {
                setFilm(res.data)
            }
            setLoading(false)
        }).catch(e => {
            if (e) return console.log(e)
        })
    }, [pn])

    return { loading, film }
}