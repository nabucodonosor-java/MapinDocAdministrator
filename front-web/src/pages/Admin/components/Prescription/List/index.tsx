import React, { useState, useCallback, useEffect } from 'react';
import { PrescriptionResponse } from 'types/prescription';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'components/Pagination';
import BasicLoader from 'components/Loaders/BasicLoader';
import PrescriptionFilters from 'components/Filters/PrescriptionFilters';
import './styles.scss';


const List = () => {
    const [prescriptionResponse, setPrescriptionResponse] = useState<PrescriptionResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');

    const getPrescriptions = useCallback(() => { 
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            sort: 'id',
            name,
            profession
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/prescriptions', params })
            .then(response => setPrescriptionResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name, profession]);

    useEffect(() => {
        getPrescriptions();
    }, [getPrescriptions]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const handleChangeProfession = (profession: string) => {
        setActivePage(0);
        setProfession(profession);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
        setProfession('');
    }

    const handleCreate = () => {
        history.push('/admin/prescriptions/create');
    }

    const onRemove = (prescriptionId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta receita?');

        if (confirm) {
            makePrivateRequest({ url: `/prescriptions/${prescriptionId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Receita deletada com sucesso!');
                    getPrescriptions();
                })
                .catch(() => { 
                    toast.error('Erro ao deletar receita');
                })
        }
    } 

    return (
        <div className="prescription-list-container">  
            <div className="prescription-list-filters-container">
                <PrescriptionFilters
                name={name}
                profession={profession}
                handleChangeName={handleChangeName}
                handleChangeProfession={handleChangeProfession}
                clearFilters={clearFilters}
                />

                <button className="btn btn-primary btn-lg mt-3 mb-2" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div>
                {isLoading ? <BasicLoader /> : (
                    prescriptionResponse?.content.map(p => (
                        <Card prescription={p} key={p.id} onRemove={onRemove} />
                    ))
                )}
                {prescriptionResponse && (
                    <Pagination
                        totalPages={prescriptionResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;