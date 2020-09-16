import React from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const Card = (props) => {
    let url, slug
    if (props.title !== undefined) {
        slug = props.title.split(' ').join('-')
        url = `${props.id}-${slug}`
    }


    let harga, rate
    if (props.harga === '') {
        harga = 'segera hadir'
    } else {
        harga = props.harga
    }
    if (props.rate === 0) {
        rate =
            <>
                <i className="far fa-star text-warning"></i>{props.rate}
            </>
    } else if (props.rate >= 1 && props.rate <= 6) {
        rate =
            <>
                <i className="fas fa-star-half-alt text-warning"></i>{props.rate}
            </>
    } else {
        rate =
            <>
                <i className="fas fa-star text-warning"></i>{props.rate}
            </>
    }
    return (
        <>
            <div className="col-12 col-md-4 my-1">
                <div className="card"  >
                    <img src={`https://image.tmdb.org/t/p/original/${props.image}`} className="card-img-top" alt={`img ${props.title}`} />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.tahun}</p>
                        <p className="card-text">{rate}</p>
                        <hr />
                        <div className="row justify-content-between">
                            <p className="card-text ml-3 ">{harga}</p>
                            <Link to={`/detail/${url}`} className="mr-3 btn btn-primary">Beli film</Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card