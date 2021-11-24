import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SocialAssistenceResponse } from 'types/socialAssistence';
import { makePrivateRequest } from 'utils/request';
import SocialProCard from './components/SocialProCard';
import CardLoader from 'components/Loaders/CardLoaders';
import Pagination from 'components/Pagination';
import SocialProFilters from 'components/Filters/SocialProFilters';
import './styles.scss';

const SocialCatalog = () => { 

    const [socialResponse, setSocialResponse] = useState<SocialAssistenceResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [localidade, setLocalidade] = useState('');

    const getSocialPro = useCallback(() => {
        const params = {
            page: activePage,
            size: 8,
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
        getSocialPro();
    }, [getSocialPro]);

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

    return (
        <div className="social-catalog-container">  
            <h3 className="text-center mb-3">Catálogo de Assistentes Sociais</h3>
            <div className="social-catalog-filter-container">

                <SocialProFilters
                    name={name}
                    profession={profession}
                    localidade={localidade}
                    handleChangeName={handleChangeName}
                    handleChangeProfession={handleChangeProfession}
                    handleChangeLocalidade={handleChangeLocalidade}
                    clearFilters={clearFilters}
                />
            </div>
            <div className="social-catalog">
                {isLoading ? <CardLoader /> : (
                    socialResponse?.content.map(s => (
                        <Link className="active-catalog-card" to={`/social/${s.id}`} key={s.id}>
                            <SocialProCard social={s} />
                        </Link>
                    ))
                )}
            </div>
            {socialResponse && (
                <Pagination
                    totalPages={socialResponse.totalPages}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default SocialCatalog;