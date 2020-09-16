import React, { useState } from 'react'
import Loading from './components/loading'
import Search from './components/search'
import Datafilm from './components/list'
import Detail from './components/detail'
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';


export default function Movie() {

    return (
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
                            Dropdown
                     </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item saldo-navbar" href="#">saldo : 100.000</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">keluar</a>
                        </div>
                    </div>
                </div>

            </div>



            <div className="container mt-5">
                <BrowserRouter>
                    <Switch>

                        <Route path='/' exact strict component={Datafilm} />
                        <Route path='/detail/:idfilm' exact strict component={Detail} />
                        <Route path='/search' exact strict component={Search} />
                    </Switch>


                </BrowserRouter>

            </div>



        </div>
    )
}