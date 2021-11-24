import React, { useState, useCallback, useEffect } from 'react';
import { Specialization } from 'types/specialization';
import { HealthProfessionalResponse } from 'types/healthProfessional';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request'; 
import { toast } from 'react-toastify';
import AdminHealthProCardLoader from '../../Loaders/AdminHealthProCardLoader';
import HealthCard from '../Card';
import Pagination from 'components/Pagination';
import HealthProFilters from 'components/Filters/HealthProFilters';
import './styles.scss';

const List = () => {
    const [hpResponse, setHpResponse] = useState<HealthProfessionalResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [specialization, setSpecialization] = useState<Specialization>();

    const getHealth = useCallback(() => { 
        const params = {
            page: activePage,
            size: 10,
            direction: 'DESC',
            sort: 'id',
            name,
            profession,
            localidade,
            specializationId: specialization?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/hp', params })
            .then(response => setHpResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
            window.scrollTo(0, 0);
    }, [activePage, name, profession, localidade, specialization]);

    useEffect(() => {
        getHealth();
    }, [getHealth]);

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

    const handleChangeSpecialization = (specialization: Specialization) => {
        setActivePage(0);
        setSpecialization(specialization);
    }

    const clearFilters = () => {
        setActivePage(0);
        setSpecialization(undefined); 
        setName('');
        setProfession('');
        setLocalidade('');
    }

    const handleCreate = () => {
        history.push('/admin/hp/create');
    }

    const onRemove = (hpId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este profissional?');

        if (confirm) {
            makePrivateRequest({ url: `/hp/${hpId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Profissional deletado com sucesso!');
                    getHealth();
                    window.scrollTo(0, 0);
                })
                .catch(() => { 
                    toast.error('Erro ao deletar profissional!');
                }) 
        }
    } 

    return ( 
        <div className="admin-hp-list-container"> 
            <div className="admin-filters-container">
                
                <HealthProFilters
                    name={name}
                    profession={profession}
                    localidade={localidade}
                    specialization={specialization}
                    handleChangeSpecialization={handleChangeSpecialization}
                    handleChangeName={handleChangeName}
                    handleChangeProfession={handleChangeProfession}
                    handleChangeLocalidade={handleChangeLocalidade}
                    clearFilters={clearFilters}
                />
                <button className="btn btn-primary btn-lg admin-hp-btn-add mt-3" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div className="admin-content-container">
                {isLoading ? <AdminHealthProCardLoader /> : (
                    hpResponse?.content.map(hp => (
                        <HealthCard hp={hp} key={hp.id} onRemove={onRemove} />
                    ))
                )}
                {hpResponse && (
                    <Pagination
                        totalPages={hpResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;