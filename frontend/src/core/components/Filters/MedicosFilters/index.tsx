import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';
import { Specialization } from 'core/types/specialization';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select';
import './styles.scss';

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    handleChangeSpecialization: (specialization: Specialization) => void;
    clearFilters: () => void;
    specialization?: Specialization; 
}

const MedicoFilters = ({ name, handleChangeName, specialization, handleChangeSpecialization, clearFilters }: Props) => {

    const [isLoadingSpecialization, setIsLoadingSpecialization] = useState(false);
    const [specializations, setSpecializations] = useState<Specialization[]>([]);

    useEffect(() => { 
        setIsLoadingSpecialization(true);
        makePrivateRequest({ url: '/specializations' })
            .then(response => setSpecializations(response.data.content))
            .finally(() => setIsLoadingSpecialization(false));
    }, []);  

    return (
        <div className="card-base medico-filters-container">
            <div className="medico-input-search">
                <input
                    type="text"
                    value={name}  
                    className="form-control"
                    placeholder="Pesquisar médico"
                    onChange={event => handleChangeName(event.target.value)}                  
                />
                <SearchIcon />
            </div>
            <Select
                name="specializations"
                key={`select-${specialization?.id}`}
                value={specialization}
                isLoading={isLoadingSpecialization}
                options={specializations}
                getOptionLabel={(option: Specialization) => option.name}
                getOptionValue={(option: Specialization) => String(option.id)}
                className="medico-filter-select-container"
                classNamePrefix="medico-especializacoes-select"
                placeholder="Pesquisar por Especialidade"
                inputId="specializations"
                onChange={value => handleChangeSpecialization(value as Specialization)}
                isClearable
            />
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default MedicoFilters;