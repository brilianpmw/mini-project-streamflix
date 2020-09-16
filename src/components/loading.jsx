import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
    return (
        <>
            <div className="col-12 col-md-4">

                <Skeleton width={200} height={90} />
                <h5 className="card-title"><Skeleton width={200} height={20} />
                </h5>
                <p className="card-text"><Skeleton width={200} height={20} />
                </p>
                <a href="#" ><Skeleton width={100} height={20} /></a>
            </div>
            <div className="col-12 col-md-4">

                <Skeleton width={200} height={90} />
                <h5 className="card-title"><Skeleton width={200} height={20} />
                </h5>
                <p className="card-text"><Skeleton width={200} height={20} />
                </p>
                <a href="#" ><Skeleton width={100} height={20} /></a>
            </div>
            <div className="col-12 col-md-4">

                <Skeleton width={200} height={90} />
                <h5 className="card-title"><Skeleton width={200} height={20} />
                </h5>
                <p className="card-text"><Skeleton width={200} height={20} />
                </p>
                <a href="#" ><Skeleton width={100} height={20} /></a>
            </div>
        </>
    )
}

export default Loading