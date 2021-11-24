import React from "react"
import Loading from 'assets/images/loading.gif';
import './styles.scss';

const BasicLoader = () => { 

    return (
        <div className="home-loader">
            <img className="home-img-loading" src={Loading} alt="Carregando ..." />
        </div>
    )
}

export default BasicLoader