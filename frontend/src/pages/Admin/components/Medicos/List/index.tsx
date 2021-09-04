import React, { useState, useCallback, useEffect } from 'react';
import { Specialization } from 'core/types/specialization';
import { DoctorResponse } from 'core/types/doctor';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import MedicosFilters from 'core/components/Filters/MedicosFilters';
import './styles.scss';

const List = () => {
    const [doctorResponse, setDoctorResponse] = useState<DoctorResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState<Specialization>();

    const getDoctors = useCallback(() => {
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            orderBy: 'id',
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

    const handleCreate = () => {
        history.push('/admin/doctors/create');
    }

    const onRemove = (doctorId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este médico(a)?');

        if (confirm) {
            makePrivateRequest({ url: `/doctors/${doctorId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Médico deletado com sucesso!');
                    getDoctors();
                })
                .catch(() => {
                    toast.error('Erro ao deletar médico');
                })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-5" onClick={handleCreate}>
                    ADICIONAR
                </button>
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
                    doctorResponse?.content.map(medico => (
                        <Card doctor={medico} key={medico.id} onRemove={onRemove} />
                    ))
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