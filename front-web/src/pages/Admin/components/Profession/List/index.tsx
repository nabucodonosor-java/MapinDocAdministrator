import React, { useState, useCallback, useEffect } from 'react';
import { ProfessionResponse } from 'types/profession';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'components/Pagination';
import BasicLoader from 'components/Loaders/BasicLoader';
import FiltersByName from 'components/Filters/FiltersByName';
import './styles.scss';


const List = () => {
    const [professionResponse, setProfessionResponse] = useState<ProfessionResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');

    const getProfessions = useCallback(() => { 
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            sort: 'id',
            name
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/profession', params })
            .then(response => setProfessionResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name]);

    useEffect(() => {
        getProfessions();
    }, [getProfessions]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
    }

    const handleCreate = () => {
        history.push('/admin/professions/create');
    }

    const onRemove = (professionId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta profissão?');

        if (confirm) {
            makePrivateRequest({ url: `/profession/${professionId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Profissão deletada com sucesso!');
                    getProfessions();
                })
                .catch(() => { 
                    toast.error('Erro ao deletar profissão');
                })
        }
    } 

    return (
        <div className="list-profession-container">   
            <div className="list-profession-filter-container">
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
                    professionResponse?.content.map(p => (
                        <Card profession={p} key={p.id} onRemove={onRemove} />
                    ))
                )}
                {professionResponse && (
                    <Pagination
                        totalPages={professionResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;