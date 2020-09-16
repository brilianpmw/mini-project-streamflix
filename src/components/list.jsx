import React, { useState } from 'react'
import Listdata from '../get-api/get-list'
import Card from './cards'
import Loading from './loading'
import Loadnow from './searchnow'
import '../App.css'

export default function dataset(props) {

    const {
        loading, error, film
    } = Listdata(1)

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
    return (
        <>
            <div className="row">
                <h3 className="ml-3">Film Indonesia yang sedang tayang</h3>
            </div>
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
                {error && <p className="red-text text-center">Error</p>}
            </div>
        </>
    )
}