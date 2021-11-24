import React, { useState, useCallback, useEffect } from 'react';
import { SpecializationResponse } from 'types/specialization';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'components/Pagination';
import BasicLoader from 'components/Loaders/BasicLoader';
import FiltersByName from 'components/Filters/FiltersByName';
import './styles.scss';



const List = () => {
    const [specializationResponse, setSpecializationResponse] = useState<SpecializationResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');

    const getSpecializations = useCallback(() => { 
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            sort: 'id',
            name
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/specializations', params })
            .then(response => setSpecializationResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name]);

    useEffect(() => {
        getSpecializations();
    }, [getSpecializations]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
    }

    const handleCreate = () => {
        history.push('/admin/specializations/create');
    }

    const onRemove = (specializationId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta especialização?');

        if (confirm) {
            makePrivateRequest({ url: `/specializations/${specializationId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Especialização deletada com sucesso!');
                    getSpecializations();
                })
                .catch(() => { 
                    toast.error('Erro ao deletar especialização');
                })
        }
    } 

    return (
        <div className="list-specializations-container">  
            <div className="list-specializations-filter-container">
                <FiltersByName
                name={name}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />

                <button className="btn btn-primary btn-lg mt-3 mb-2" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div>
                {isLoading ? <BasicLoader /> : (
                    specializationResponse?.content.map(s => (
                        <Card specialization={s} key={s.id} onRemove={onRemove} />
                    ))
                )}
                {specializationResponse && (
                    <Pagination
                        totalPages={specializationResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;