import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';

import './styles.scss';

type Props = {
    firstDate?: string;
    secondDate?: string;
    handleChangeDate: () => void; 
    clearFilters: () => void;
}

const VisitFilters = ({ firstDate, secondDate, handleChangeDate, clearFilters }: Props) => {

    return (
        <div className="card-base place-filters-container">
            <div className="place-input-search">
                <input
                    type="date"
                    value={firstDate}  
                    className="form-control"
                    placeholder="Data Inicial"                  
                />
                <input
                    type="date"
                    value={secondDate}  
                    className="form-control"
                    placeholder="Data Final"              
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

export default VisitFilters;