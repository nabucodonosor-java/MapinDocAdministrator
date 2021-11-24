import React, { useState, useCallback, useEffect } from 'react';
import { SecretaryResponse } from 'types/secretary';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request'; 
import { toast } from 'react-toastify';
import Pagination from 'components/Pagination';
import AdminHealthProCardLoader from '../../Loaders/AdminHealthProCardLoader';
import SecretaryCard from '../Card';
import FiltersByName from 'components/Filters/FiltersByName';
import './styles.scss';

const List = () => {
    const [secretaryResponse, setSecretaryResponse] = useState<SecretaryResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');

    const getSecretaries = useCallback(() => { 
        const params = {
            page: activePage,
            size: 10,
            direction: 'DESC',
            sort: 'id',
            name
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/secretaries', params })
            .then(response => setSecretaryResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
            window.scrollTo(0, 0);
    }, [activePage, name]);

    useEffect(() => {
        getSecretaries();
    }, [getSecretaries]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
    }

    const handleCreate = () => {
        history.push('/admin/secretaries/create');
    }

    const onRemove = (secretaryId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este secretária?');

        if (confirm) {
            makePrivateRequest({ url: `/secretaries/${secretaryId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Secretária deletada com sucesso!');
                    getSecretaries();
                    window.scrollTo(0, 0);
                })
                .catch(() => { 
                    toast.error('Erro ao deletar secretária!');
                }) 
        }
    } 

    return ( 
        <div className="admin-secretary-list-container"> 
            <div className="admin-filters-container">
                <FiltersByName
                name={name}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />
                
                <button className="btn btn-primary btn-lg admin-hp-btn-add mt-3" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div className="admin-content-container">
                {isLoading ? <AdminHealthProCardLoader /> : (
                    secretaryResponse?.content.map(s => (
                        <SecretaryCard secretary={s} key={s.id} onRemove={onRemove} />
                    ))
                )}
                {secretaryResponse && (
                    <Pagination
                        totalPages={secretaryResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;