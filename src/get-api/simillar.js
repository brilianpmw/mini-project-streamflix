import { useState, useEffect } from 'react';
import axios from 'axios'
export default function Simillar(idfilm, pn) {
    let url = `https://api.themoviedb.org/3/movie/${idfilm}/similar`
    let apikey = "c5644ed3dcdd41ce81c890ef53c713c7"
    let [loadingsimillar, setLoading] = useState(true)
    let [filmsimillar, setFilm] = useState([])



    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            url: url,
            params: { api_key: apikey, page: pn },
        }).then(res => {
            if (res.status === 200) {
                setFilm(res.data.results)
            }
            setLoading(false)
        }).catch(e => {
            if (e) return
        })
    }, [pn])

    return { loadingsimillar, filmsimillar }
}