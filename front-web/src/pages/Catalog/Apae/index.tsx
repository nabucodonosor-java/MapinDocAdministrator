import React, { useCallback, useEffect, useState } from 'react'; 
import { PlaceServiceResponse } from 'types/placeService';
import { makePrivateRequest } from 'utils/request';
import ApaeFilters from 'components/Filters/ApaeFilters';
import Pagination from 'components/Pagination';
import ApaeCard from 'components/ApaeCard';
import './styles.scss';
import BasicLoader from 'components/Loaders/BasicLoader';
import CardLoaders from 'components/Loaders/CardLoaders';

const ApaeCatalog = () => {  

    const [placeResponse, setPlaceResponse] = useState<PlaceServiceResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [localidade, setLocalidade] = useState('');

    const getPlace = useCallback(() => {
        const params = {
            page: activePage,
            size: 8,
            localidade
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/places/apae', params })
            .then(response => setPlaceResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, [activePage, localidade]);

    useEffect(() => {
        getPlace();
    }, [getPlace]);

    const handleChangeLocalidade = (localidade: string) => {
        setActivePage(0);
        setLocalidade(localidade);
    }

    const clearFilters = () => {
        setActivePage(0);
        setLocalidade('');
    }

    return (
        <>
        {isLoading ? (<BasicLoader />) : (
            <div className="apae-catalog-container">
            <h4 className="text-center mb-3">Catálogo de Apae´s</h4>
            <div className="apae-catalog-filter-container">
                <ApaeFilters
                    localidade={localidade}
                    handleChangeLocalidade={handleChangeLocalidade}
                    clearFilters={clearFilters}
                />
            </div>
            <div className="apae-catalog">
                {isLoading ? <CardLoaders /> : (
                    placeResponse?.content.map(place => (
                        <div key={place.id}>
                            <ApaeCard place={place} />
                        </div>
                    ))
                )}
            </div>
            {placeResponse && (
                <Pagination
                    totalPages={placeResponse.totalPages}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
        )} 
        </>
    )
}

export default ApaeCatalog;