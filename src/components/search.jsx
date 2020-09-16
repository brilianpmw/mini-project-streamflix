import React, { useState } from 'react'
import Cari from '../get-api/search-api'
import Card from './cards'
import Loading from './loading'
import Loadnow from './searchnow'
import '../App.css'

export default function Searchfilm(props) {
    const [query, setQuery] = useState('')
    const [pn, setPn] = useState(1)
    const [onsearch, SetOnsearch] = useState(false)


    function handlesearch(e) {
        setQuery(e.target.value)
        setPn(1)
        SetOnsearch(true)
    }

    function formatRupiah(angka, prefix) {
        let number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi),
            separator;

        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }
    let tampil

    const {
        loading, film
    } = Cari(query, 1)



    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <input className="form-control form-control-lg" onChange={handlesearch} type="text" placeholder="masukan judul untuk melihat " />
                </div>

            </div>
            <div className="container mt-5">

                <div className="row justify-content-center text-center">
                    {
                        loading && <Loading />

                    }
                    {film ? film.map((data, index) => {
                        let harga = (data.vote_average >= 1 && data.vote_average <= 3) ? 3500 :
                            (data.vote_average > 3 && data.vote_average <= 6) ? 8250 :
                                (data.vote_average > 6 && data.vote_average <= 8) ? 16350 :
                                    (data.vote_average > 8 && data.vote_average <= 10) ? 21250 : 'belum ada harga';
                        return <Card id={data.id} key={index} harga={formatRupiah(harga.toString(), 'Rp')} rate={data.vote_average} title={data.original_title} image={data.poster_path} />
                    }) : <Loadnow />

                    }
                </div>
            </div>

        </>
    )
}