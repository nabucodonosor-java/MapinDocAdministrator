import React, { useState, useCallback, useEffect } from 'react';
import { VisitResponse } from 'core/types/visit';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import HomeLoader from 'pages/Home/components/HomeLoader';
import './styles.scss';



const List = () => {
    const [visitResponse, setVisitResponse] = useState<VisitResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getVisits = useCallback(() => { 
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            sort: 'id'
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/visits', params })
            .then(response => setVisitResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getVisits();
    }, [getVisits]);

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
        <div className="admin-doc-list-container"> 
            <div className="admin-filters-container">
                <button className="btn btn-primary btn-lg admin-btn-add mb-1" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div className="admin-content-container">
                {isLoading ? <HomeLoader /> : (
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