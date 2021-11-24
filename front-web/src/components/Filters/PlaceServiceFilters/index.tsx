import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';
import './styles.scss';

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    localidade?: string;
    handleChangeLocalidade: (localidade: string) => void;
    logradouro?: string;
    handleChangeLogradouro: (logradouro: string) => void;
    clearFilters: () => void; 
}

const PlaceServiceFilters = ({ name, handleChangeName, logradouro, handleChangeLogradouro, localidade, 
    handleChangeLocalidade, clearFilters }: Props) => {

    return (
        <div className="base-card place-filters-container">
            <div className="place-filters-title">
                <h4>Filtros</h4><SearchIcon />
            </div>
            <div className="place-input-search">
                <input
                    type="text"
                    value={name}  
                    className="form-control"
                    placeholder="por nome"
                    onChange={event => handleChangeName(event.target.value)}                  
                />
                <input
                    type="text"
                    value={logradouro}  
                    className="form-control"
                    placeholder="por endereço"
                    onChange={event => handleChangeLogradouro(event.target.value)}                  
                />
                 <input
                    type="text"
                    value={localidade}  
                    className="form-control"
                    placeholder="por cidade"
                    onChange={event => handleChangeLocalidade(event.target.value)}                  
                />
            </div>
           
            <button 
                className="btn btn-outline-primary"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default PlaceServiceFilters;