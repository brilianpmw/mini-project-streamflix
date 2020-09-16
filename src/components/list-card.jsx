import React from 'react';
import Caridata from '../search-api'
import Card from './cards'

const {
    loading, error, film
} = Caridata(query, pageNumber)

const Listcard = () => {

    return (
        <div>
            <Card />
        </div>
    )
}

export default Listcard