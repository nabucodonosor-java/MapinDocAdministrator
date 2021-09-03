import React, { useEffect, useState } from 'react';
import { Specialization } from 'src/types/specialization';
import { makePrivateRequest } from 'src/utils/requests';
import { ReactComponent as SearchIcon } from 'src/assets/images/lupa.svg';
import Select from 'react-select';
import './styles.css';

type Props = {
    name?: string;
    handleChangeName: (name: string) => void;
    handleChangeSpecialization: (specialtization: Specialization) => void;
    clearFilters: () => void;
    specialization?: Specialization;
}

const DoctorFilters = ({ name, handleChangeName, specialization, handleChangeSpecialization, clearFilters } : Props) => {

    const [isLoadingSpecialization, setIsLoadingSpecialization] = useState(false);
    const [specializations, setSpecializations] = useState<Specialization[]>([]);

    useEffect(() => {

        setIsLoadingSpecialization(true);
        makePrivateRequest({ url: '/specializations' })
        .then(response => setSpecializations(response.data.content))
        .finally(() => setIsLoadingSpecialization(false));

    }, []);

    return (
        <div className="card-base doctor-filters-container"> 
            <div className="doctor-input-search">
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
                className="doctor-filter-select-container"
                classNamePrefix="doctor-specializations-select"
                placeholder="Pesquisar por Especialização"
                inputId="specializations"
                onChange={value => handleChangeSpecialization(value as Specialization)}
                isClearable
            />
            <button 
                className="btn btn-outline-primary"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default DoctorFilters;