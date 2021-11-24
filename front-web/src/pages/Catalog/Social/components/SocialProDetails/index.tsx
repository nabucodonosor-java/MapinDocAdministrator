/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import { makePrivateRequest } from 'utils/request';
import { SocialAssistence } from 'types/socialAssistence';
import BasicLoader from 'components/Loaders/BasicLoader';

import './styles.scss';

type ParamsType = {
    socialId: string;
}

const SocialProDetails = () => { 

    const { socialId } = useParams<ParamsType>();
    const [social, setSocial] = useState<SocialAssistence>();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        makePrivateRequest({ url: `/social/${socialId}`})
        .then(response => setSocial(response.data))
        .finally(() => setIsLoading(false));
    }, [socialId]);

    return (
        <div className="social-details-container">
        <div>
        <Link to="/social" className="details-goback">
            <ArrowIcon/>
            <h2>voltar</h2>
        </Link>
        </div>
        {isLoading ? <BasicLoader /> : (
            <div className="base-card border-radius-20 social-details-card">
             
                    <h2>{social?.name}</h2>
                    <h3>{social?.profession.name}</h3>

                    <h4>Informações</h4>
                    <div className="social-details-card-info">
                        <span><strong>CELULAR: </strong>{social?.cellPhone == undefined ? 'celular não cadastrado' : social.cellPhone}</span>         
                        
                        <span><strong>EMAIL: </strong>{social?.email == undefined ? 'e-mail não cadastrado' : social.email}</span>

                        <span><strong>CIDADE: </strong>{social?.placeService.localidade == undefined ? 'cidade não cadastrada' : social.placeService.localidade}</span> 
                    </div>
                    <h4>Descrição</h4>
                    
                    <p>{social?.description}</p>   
      
            </div>
            )}
                
    </div>

    );
};

export default SocialProDetails;