import React, { useState, useCallback, useEffect } from 'react';
import { MedicalVisitResponse } from 'types/medicalVisit';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'components/Pagination';
import BasicLoader from 'components/Loaders/BasicLoader';
import VisitFilters from 'components/Filters/VisitFilters';
import './styles.scss';

const List = () => {
    const [visitResponse, setVisitResponse] = useState<MedicalVisitResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [localidade, setLocalidade] = useState('');

    const getVisits = useCallback(() => { 
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            sort: 'id',
            name,
            profession,
            localidade
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/visits', params })
            .then(response => setVisitResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name, profession, localidade]);

    useEffect(() => {
        getVisits();
    }, [getVisits]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const handleChangeProfession = (profession: string) => {
        setActivePage(0);
        setProfession(profession);
    }

    const handleChangeLocalidade = (localidade: string) => {
        setActivePage(0);
        setLocalidade(localidade);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
        setProfession('');
        setLocalidade('');
    }

    const handleCreate = () => {
        history.push('/admin/visits/create');
    }

    const onRemove = (visitId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta visita?');

        if (confirm) {
            makePrivateRequest({ url: `/visits/${visitId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Visita deletada com sucesso!');
                    getVisits();
                })
                .catch(() => { 
                    toast.error('Erro ao deletar visita');
                })
        }
    } 

    return (
        <div className="admin-visit-list-container">  
            <div className="admin-visit-list-filters-container">
                <VisitFilters
                    name={name}
                    profession={profession}
                    localidade={localidade}
                    handleChangeName={handleChangeName}
                    handleChangeProfession={handleChangeProfession}
                    handleChangeLocalidade={handleChangeLocalidade}
                    clearFilters={clearFilters}
                />
                <button className="btn btn-primary btn-lg mt-3" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div>
                {isLoading ? <BasicLoader /> : (
                    visitResponse?.content.map(v => (
                        <Card visit={v} key={v.id} onRemove={onRemove} />
                    ))
                )}
                {visitResponse && (
                    <Pagination
                        totalPages={visitResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;