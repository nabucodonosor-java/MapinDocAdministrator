import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';

import './styles.scss';

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    clearFilters: () => void;
}

const PlaceServiceFilters = ({ name, handleChangeName, clearFilters }: Props) => {

    return (
        <div className="card-base medico-filters-container">
            <div className="medico-input-search">
                <input
                    type="text"
                    value={name}  
                    className="form-control"
                    placeholder="Pesquisar local"
                    onChange={event => handleChangeName(event.target.value)}                  
                />
                <SearchIcon />
            </div>
            
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default PlaceServiceFilters;