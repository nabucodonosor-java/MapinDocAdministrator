import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';
import './styles.scss';

type Props = { 
    localidade?: string;
    handleChangeLocalidade: (localidade: string) => void;
    clearFilters: () => void; 
}

const ApaeFilters = ({ localidade, handleChangeLocalidade, clearFilters }: Props) => { 

    return (
        <div className="base-card apae-filters-container">
            <div className="apae-filters-title">
                <h4>Filtros</h4><SearchIcon />
            </div>
            <div className="apae-input-search">
                
                 <input
                    type="text"
                    value={localidade}  
                    className="form-control"
                    placeholder="por cidade"
                    onChange={event => handleChangeLocalidade(event.target.value)}                  
                />
                <button 
                className="btn btn-outline-primary border-radius-10"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
            </div>
        </div>
    )
}

export default ApaeFilters;