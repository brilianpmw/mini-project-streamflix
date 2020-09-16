import React, { useState } from 'react'
import Detail from '../get-api/detail-film'
import Loading from './loading'
import '../App.css'
import Simillar from '../get-api/simillar';
import filmPop from '../get-api/popular'
import { Link, withRouter } from 'react-router-dom'

function Detailfilm(props) {



    let idfilm = props.match.params.idfilm
    let id = idfilm.split('-', 1);
    const { loading, film } = Detail(id)

    let { loadingsimillar, filmsimillar } = Simillar(id, 1)
    let { loadpopular, popular } = filmPop(1)
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

    let genre, bahasa, harga, hargarp, buttonbeli, simillar, popularfilm = 'loading'
    harga = (film.vote_average >= 1 && film.vote_average <= 3) ? 3500 :
        (film.vote_average > 3 && film.vote_average <= 6) ? 8250 :
            (film.vote_average > 6 && film.vote_average <= 8) ? 16350 :
                (film.vote_average > 8 && film.vote_average <= 10) ? 21250 : 0;


    if (film.genres !== undefined) {
        genre = film.genres.map(data => {
            return ` ${data.name} `
        })
    }

    if (film.spoken_languages !== undefined) {
        bahasa = film.spoken_languages.map(data => {
            return <><br /><strong key={data.id}>{data.name}</strong></>
        })
    }


    let arr = [harga]
    hargarp = formatRupiah(arr.toString(), 'Rp')
    let datatransaksi = JSON.parse(localStorage.getItem('transaksi'))

    if (harga > 0) {
        if (datatransaksi) {
            if (datatransaksi.some(el => el.idfilm === film.id)) {
                buttonbeli = <button type="button" onClick={() => { alert('film segera dimulai') }} className="btn btn-success">Lihat film</button>


            } else {
                buttonbeli = <button type="button" onClick={() => { transaksi() }} className="btn btn-primary">Beli - {hargarp}</button>

            }
        } else {
            buttonbeli = <button type="button" onClick={() => { transaksi() }} className="btn btn-primary">Beli - {hargarp}</button>

        }

    } else {
        buttonbeli = <button type="button" className="btn btn-secondary">segera hadir</button>

    }
    if (filmsimillar.length >= 3) {
        filmsimillar = filmsimillar.slice(0, 3)
    }
    if (filmsimillar.length !== 0) {
        simillar =
            <>
                {
                    loadingsimillar && <Loading />

                }
                {filmsimillar.map(data => {
                    let id = data.id
                    let title = data.original_title
                    let slug = title.split(' ').join('-')
                    let url = `${id}-${slug}`
                    return (
                        <>

                            <div className="col-12 col-md-4 ">
                                <div className="card"  >
                                    <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} className="card-img-top" alt={`img ${data.title}`} />
                                    <div className="card-body">
                                        <h5 className="card-title">{data.original_title}</h5>
                                        <Link to={`/detail/${url}`} className="mr-3 btn btn-primary">Beli film</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
    } else {
        simillar =
            <>
                <p className="text-muted  text-center"> tidak ada film yang sama</p>
            </>
    }

    if (popular.length !== 0) {

        popularfilm =
            <>
                {
                    loadpopular && <Loading />

                }
                {popular.slice(0, 5).map(data => {
                    let id = data.id
                    let title = data.original_title
                    let slug = title.split(' ').join('-')
                    let url = `${id}-${slug}`
                    return (
                        <>

                            <div className="col-12 col-md-2 ">
                                <div className="card"  >
                                    <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} className="card-img-top" alt={`img ${data.title}`} />
                                    <div className="card-body">
                                        <h5 className="card-title">{data.original_title}</h5>
                                        <Link to={`/detail/${url}`} className="mr-3 btn btn-primary">Beli film</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>

    }

    let transaksi = () => {
        let datatransaksi = localStorage.getItem('transaksi');

        let user = localStorage.getItem('account');
        let akun = {}
        if (user === null) {
            let namauser = prompt('masukan nama kamu : ')
            let datauser = {
                nama: namauser,
                saldo: 100000
            }
            localStorage.setItem('account', JSON.stringify(datauser))
            window.location.reload()
        } else {
            akun = JSON.parse(user)
        }

        if (akun.saldo >= harga) {

            let saldo = akun.saldo - harga
            let akunupdate = {
                nama: akun.nama,
                saldo: saldo
            }
            if (datatransaksi !== null) {

                datatransaksi = JSON.parse(datatransaksi)
                if (datatransaksi.some(el => el.idfilm === film.id)) {
                    alert(`anda sudah membeli film ini`)

                } else {

                    let newtransaksi = {
                        idfilm: film.id,
                        harga: harga
                    }
                    datatransaksi.push(newtransaksi)
                    localStorage.setItem('account', JSON.stringify(akunupdate))
                    localStorage.setItem('transaksi', JSON.stringify(datatransaksi))

                    alert(`pembelian film ${film.title} berhasul dilakukan `)
                }

            } else {
                let saldo = akun.saldo - harga
                let akunupdate = {
                    nama: akun.nama,
                    saldo: saldo
                }
                let transaksi = [{
                    idfilm: film.id,
                    harga: harga
                }]
                localStorage.setItem('account', JSON.stringify(akunupdate))
                localStorage.setItem('transaksi', JSON.stringify(transaksi))
                alert(`pembelian film ${film.title} berhasul dilakukan `)
            }

            window.location.reload()

        } else {
            alert(`saldo anda kurang.. silahkan top up terlebih dahulu`)

        }

    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5">
                        <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} style={{ width: '100%', height: '80vh' }} className="img-fluid" alt={`img ${film.title}`} />
                    </div>
                    <div className="col-12 col-md-6">
                        <h2 className="text-start">{film.original_title} - {film.tagline}</h2>
                        <hr />
                        <div className="ml-2 row justify-content-start">
                            <h6 className="text-muted">{film.overview}</h6>
                        </div>
                        <div className="row mt-3 justify-content-center">
                            <div className="col-6 col-md-3">
                                <p className="text-muted text-center">popularitas <br />  <strong>{film.popularity}</strong></p>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-muted text-center">waktu rilis <br />  <strong>{film.release_date}</strong></p>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-muted text-center">Rating <br /> <strong>{film.vote_average}</strong></p>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-muted text-center">Bahasa {bahasa} </p>
                            </div>
                        </div>
                        <div className="row ml-2 mt-2">
                            <p className="text-muted"><strong>Genre :</strong> {genre}</p>
                        </div>
                        <div className="row justify-content-center mt-3">
                            {buttonbeli}
                        </div>
                        <h5 className=" mt-5 text-start">film yang sama :</h5>

                        <div className=" mt-4 row justify-content-center">
                            {simillar}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h5 className=" mt-5 text-start">film Popular :</h5>
                </div>
                <div className="row justify-content-center">
                    {popularfilm}
                </div>
            </div>
        </>
    )
}

export default withRouter(Detailfilm)
