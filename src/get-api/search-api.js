import { useState, useEffect } from 'react';
import axios from 'axios'
export default function Caridata(query, pn) {
    let url = "https://api.themoviedb.org/3/search/multi"
    let apikey = "c5644ed3dcdd41ce81c890ef53c713c7"
    let [loading, setLoading] = useState(true)
    let [film, setFilm] = useState([])

    useEffect(() => {
        setFilm([])
    }, [query])

    useEffect(() => {


        setLoading(true)
        let cancel
        axios({
            method: 'GET',
            url: url,
            params: { api_key: apikey, query: query, page: pn, region: 'ID' },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            if (res.status === 200) {
                setFilm(res.data.results)
            }
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    }, [query, pn])

    return { loading, film }
}