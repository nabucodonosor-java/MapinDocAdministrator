import React, { useState, useCallback, useEffect } from 'react';
import { Specialization } from 'core/types/specialization';
import { DoctorResponse } from 'core/types/doctor';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
import Pagination from 'core/components/Pagination';
import MedicosFilters  from 'core/components/Filters/MedicosFilters';
import './styles.scss';

const List = () => {
    const [doctorResponse, setDoctorResponse] = useState<DoctorResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState<Specialization>();

    const getDoctors = useCallback(() => {
        const params = {
            page: activePage,
            size: 10,
            direction: 'ASC',
            orderBy: 'nome',
            name,
            specializationId: specialization?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: `/doctors?page=${activePage}`, params })
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
        <div className="report-div">
            <h3 className="report-title">Pesquisas Avançadas - Médicos (as)</h3>
            <div className="d-flex justify-content-between admin-div-btn">
                <MedicosFilters
                    name={name}
                    specialization={specialization}
                    handleChangeSpecialization={handleChangeSpecialization}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Especialidade</th>
                                <th>CRM</th>
                                <th>Nome</th>
                                <th>Especializações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorResponse?.content.map(item => (
                                <tr key={item.id}>
                                    <td>{item.specialty.name}</td>
                                    <td>{item.crm}</td>
                                    <td>{item.name}</td>
                                    <td>{item.specializations.map(s => s.name)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
                {doctorResponse && (
                <Pagination 
                totalPages={doctorResponse.totalPages}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;