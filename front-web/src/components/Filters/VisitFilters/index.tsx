import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';

type Props = { 
    name?: string;
    handleChangeName: (name: string) => void;
    profession?: string;
    handleChangeProfession: (profession: string) => void;
    localidade?: string;
    handleChangeLocalidade: (localidade: string) => void;
    clearFilters: () => void;
}

const VisitFilters = ({ name, handleChangeName, profession, handleChangeProfession, localidade, handleChangeLocalidade,
    clearFilters }: Props) => { 

    return (
        <div className="base-card border-radius-20 visit-filters-container">
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
                <input
                    type="text"
                    value={profession}  
                    className="form-control"
                    placeholder="por profissão"
                    onChange={event => handleChangeProfession(event.target.value)}                  
                />
                 <input
                    type="text"
                    value={localidade}  
                    className="form-control"
                    placeholder="por cidade"
                    onChange={event => handleChangeLocalidade(event.target.value)}                  
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

export default VisitFilters;