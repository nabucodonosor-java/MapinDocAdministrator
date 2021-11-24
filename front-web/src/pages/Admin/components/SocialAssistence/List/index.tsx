import React, { useState, useCallback, useEffect } from 'react';
import { SocialAssistenceResponse } from 'types/socialAssistence';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request'; 
import { toast } from 'react-toastify';
import AdminHealthProCardLoader from '../../Loaders/AdminHealthProCardLoader';
import SocialCard from '../Card';
import Pagination from 'components/Pagination';
import './styles.scss';
import SocialProFilters from 'components/Filters/SocialProFilters';

const List = () => {
    const [socialResponse, setSocialResponse] = useState<SocialAssistenceResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [localidade, setLocalidade] = useState('');

    const getSocial = useCallback(() => { 
        const params = {
            page: activePage,
            size: 10,
            direction: 'DESC',
            sort: 'id',
            name,
            profession,
            localidade
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/social', params })
            .then(response => setSocialResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
            window.scrollTo(0, 0);
    }, [activePage, name, profession, localidade]);

    useEffect(() => {
        getSocial();
    }, [getSocial]);

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
        history.push('/admin/social/create');
    }

    const onRemove = (socialId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este profissional?');

        if (confirm) {
            makePrivateRequest({ url: `/social/${socialId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Profissional deletado com sucesso!');
                    getSocial();
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
                
                <SocialProFilters
                name={name}
                profession={profession}
                localidade={localidade}
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
                    socialResponse?.content.map(social => (
                        <SocialCard social={social} key={social.id} onRemove={onRemove} />
                    ))
                )}
                {socialResponse && (
                    <Pagination
                        totalPages={socialResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;