import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'assets/images/lupa.svg';
import { Specialization } from 'types/specialization';
import { makePrivateRequest } from 'utils/request';
import Select from 'react-select';

type Props = { 
    name?: string;
    handleChangeName: (name: string) => void;
    profession?: string;
    handleChangeProfession: (profession: string) => void;
    localidade?: string;
    handleChangeLocalidade: (localidade: string) => void;
    handleChangeSpecialization: (specialization: Specialization) => void;
    clearFilters: () => void;
    specialization?: Specialization; 
}

const HealthProFilters = ({ name, handleChangeName, profession, handleChangeProfession, localidade, handleChangeLocalidade,
    specialization, handleChangeSpecialization, clearFilters }: Props) => {

    const [isLoadingSpecialization, setIsLoadingSpecialization] = useState(false);
    const [specializations, setSpecializations] = useState<Specialization[]>([]);

    useEffect(() => { 
        setIsLoadingSpecialization(true);
        makePrivateRequest({ url: '/specializations' })
            .then(response => setSpecializations(response.data.content))
            .finally(() => setIsLoadingSpecialization(false));
    }, []);  

    return (
        <div className="base-card hp-filters-container">
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
            <Select
                name="specializations" 
                key={`select-${specialization?.id}`}
                value={specialization}
                isLoading={isLoadingSpecialization}
                options={specializations}
                getOptionLabel={(option: Specialization) => option.name}
                getOptionValue={(option: Specialization) => String(option.id)}
                className="hp-filter-select-container"
                classNamePrefix="hp-specializations-select"
                placeholder="por especialidade"
                inputId="specializations"
                onChange={value => handleChangeSpecialization(value as Specialization)}
                isClearable
            />
            <button 
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
            </div>
        </div>
    )
}

export default HealthProFilters;