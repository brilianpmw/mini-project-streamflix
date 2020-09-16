import React, { useState, useEffect } from 'react'
import Loading from './components/loading'
import Search from './components/search'
import Datafilm from './components/list'
import Detail from './components/detail'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';


export default function App() {

  useEffect(() => {
    document.title = 'Streamflix - tempat streaming film paling asik'

  })

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

  let logout = () => {
    localStorage.removeItem('account')
    localStorage.removeItem('transaksi')

    // alert('cant')
  }

  return (
    <BrowserRouter>

      <div>

        <div className="justify-content-center row bg-dark text-white pt-5 pb-5">

          <div className="col-12 col-md-4">
            <Link style={{ textDecoration: 'none' }} to={`/`}><h3 className="text-center judul">StreamFilx</h3> </Link>
            {/* <a style={{ textDecoration: 'none' }} href="/"><h3 className="text-center judul">StreamFilx</h3> </a> */}


            <p className="text-muted text-center">Tempat streaming film paling asik</p>
          </div>
        </div>
        <div className="container mt-2">
          <div className="row justify-content-end">
            <div className="col-12 col-md-2  ">
              <div className="row justify-content-end">
                <Link to={`/search`} className="btn btn-light ">Cari film </Link>
              </div>

            </div>
            <div className="col-12 col-md-2">
              <a className="nav-link dropdownname dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Hello, {akun.nama}!
                   </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item saldo-navbar" href="#">saldo : {akun.saldo}</a>
                <div className="dropdown-divider"></div>

                <a className="dropdown-item" onClick={() => { logout() }} href="/">keluar</a>
              </div>
            </div>
          </div>

        </div>



        <div className="container mt-5">
          <Switch>
            <Route path='/' exact strict component={Datafilm} />
            <Route path='/detail/:idfilm' strict component={Detail} />
            <Route path='/search' strict component={Search} />
          </Switch>



        </div>



      </div>
    </BrowserRouter>

  )
}