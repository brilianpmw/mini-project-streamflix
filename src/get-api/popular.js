import { useState, useEffect } from 'react';
import axios from 'axios'
export default function Popular(pn) {
    let url = `https://api.themoviedb.org/3/movie/popular`
    let apikey = "c5644ed3dcdd41ce81c890ef53c713c7"
    let [loadpopular, setLoadpopular] = useState(true)
    let [popular, setPopular] = useState([])



    useEffect(() => {
        setLoadpopular(true)
        axios({
            method: 'GET',
            url: url,
            params: { api_key: apikey, page: pn, region: 'ID' },
        }).then(res => {
            if (res.status === 200) {
                setPopular(res.data.results)
            }
            setLoadpopular(false)
        }).catch(e => {
            if (e) return
        })
    }, [pn])

    return { loadpopular, popular }
}