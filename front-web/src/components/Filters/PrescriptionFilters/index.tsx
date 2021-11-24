import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';


type Props = { 
    name?: string;
    handleChangeName: (name: string) => void;
    profession?: string;
    handleChangeProfession: (profession: string) => void;
    clearFilters: () => void;
}

const PrescriptionFilters = ({ name, handleChangeName, profession, handleChangeProfession, clearFilters }: Props) => {

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
                <input
                    type="text"
                    value={profession}  
                    className="form-control"
                    placeholder="por profissão"
                    onChange={event => handleChangeProfession(event.target.value)}                  
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

export default PrescriptionFilters;