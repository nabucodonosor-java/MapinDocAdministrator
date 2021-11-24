import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';

type Props = { 
    name?: string;
    handleChangeName: (name: string) => void;
    clearFilters: () => void;
}

const FiltersByName = ({ name, handleChangeName, clearFilters }: Props) => {

    return (
        <div className="base-card border-radius-20">
            <div className="hp-filters-title">
                <h4>Filtros</h4><SearchIcon />
            </div>
            <div className="hp-input-search">
                <input
                    type="text"
                    value={name}  
                    className="form-control"
                    placeholder="por nome"
                    onChange={event => handleChangeName(event.target.value)}                  
                /> 
            </div>
            <div className="hp-select-btn">
            <button 
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
            </div>
        </div>
    )
}

export default FiltersByName;