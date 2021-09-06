import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoctorResponse } from 'core/types/doctor';
import { Specialization } from 'core/types/specialization';
import { makePrivateRequest } from 'core/utils/request';
import MedicoCard from './components/MedicoCard';
import MedicoCardLoader from './components/Loaders/MedicoCardLoader';
import Pagination from 'core/components/Pagination';
import MedicoFilters from 'core/components/Filters/MedicosFilters';
import './styles.scss';


const Catalog = () => { 

    const [doctorResponse, setDoctorResponse] = useState<DoctorResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState<Specialization>();

    const getDoctors = useCallback(() => {
        const params = {
            page: activePage,
            size: 9,
            name,
            specializationId: specialization?.id
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/doctors', params })
            .then(response => setDoctorResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name, specialization]);

    useEffect(() => {
        getDoctors();
    }, [getDoctors]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const handleChangeSpecialization = (specialization: Specialization) => {
        setActivePage(0);
        setSpecialization(specialization);
    }

    const clearFilters = () => {
        setActivePage(0);
        setSpecialization(undefined);
        setName('');
    }

    return (
        <div className="catalog-container">
            <div className="catalog-filter-container">

                <MedicoFilters
                    name={name}
                    specialization={specialization}
                    handleChangeSpecialization={handleChangeSpecialization}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                />
            </div>
            <div className="catalog-medicos">
                {isLoading ? <MedicoCardLoader /> : (
                    doctorResponse?.content.map(medico => (
                        <Link to={`/doctors/${medico.id}`} key={medico.id}>
                            <MedicoCard doctor={medico} />
                        </Link>
                    ))
                )}
            </div>
            {doctorResponse && (
                <Pagination
                    totalPages={doctorResponse.totalPages}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default Catalog;