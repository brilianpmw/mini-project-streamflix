import { useState, useEffect } from 'react';
import axios from 'axios'
export default function Daftarfilm(pn) {
    let url = "https://api.themoviedb.org/3/movie/now_playing"
    let apikey = "c5644ed3dcdd41ce81c890ef53c713c7"
    let [loading, setLoading] = useState(true)
    let [film, setFilm] = useState([])
    let [error, setError] = useState(false)



    useEffect(() => {
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: url,
            params: { api_key: apikey, page: pn, region: 'ID' },
        }).then(res => {
            if (res.status === 200) {
                setFilm(res.data.results)
            }
            setLoading(false)
        }).catch(e => {
            if (e) return
            setError(true)
        })
    }, [pn])

    return { loading, error, film }
}