import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';
import './styles.scss';

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    profession?: string;
    handleChangeProfession: (profession: string) => void;
    localidade?: string;
    handleChangeLocalidade: (localidade: string) => void;
    clearFilters: () => void; 
}

const SocialProFilters = ({ name, handleChangeName, profession, handleChangeProfession, localidade, 
    handleChangeLocalidade, clearFilters }: Props) => {

    return (
        <div className="base-card social-filters-container">
            <div className="social-filters-title">
                <h4>Filtros</h4><SearchIcon />
            </div>
            <div className="social-input-search">
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
           
            <button 
                className="btn btn-outline-primary"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default SocialProFilters;