import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { makePrivateRequest } from 'core/utils/request';
import { Doctor } from 'core/types/doctor';
import MedicoInfoLoader from '../Loaders/MedicoInfoLoader';
import MedicoDescriptionLoader from '../Loaders/MedicoDescriptionLoader';

import './styles.scss';

type ParamsType = {
    doctorId: string;
}

const MedicoDetails = () => { 

    const { doctorId } = useParams<ParamsType>();
    const [doctor, setDoctor] = useState<Doctor>();
    const[isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        makePrivateRequest({ url: `/doctors/${doctorId}`})
        .then(response => setDoctor(response.data))
        .finally(() => setIsLoading(false));
    }, [doctorId]);

    return (
        <div className="medico-details-container">
            <div className="card-base border-radius-20 medico-details">
                <Link to="/doctors" className="medico-details-goback">
                <ArrowIcon className="medico-details-icon-goback"/>
                <h1 className="medico-details-text-goback">voltar</h1>
                </Link>
                <div className="morador-details-div-info">
                        {isLoading ? <MedicoInfoLoader /> : (
                    <div className="medico-details-card">
                        <div className="text-center">
                                <img src={doctor?.imgUrl} alt={doctor?.name} className="medico-details-image" />
                        </div>
                            <h1 className="medico-details-name">
                                {doctor?.name}
                            </h1>
                            <div className="medico-details-specialty">
                                <h6 className="medico-details-specialty-title">
                                    {doctor?.specialty.name}
                                </h6>
                            </div>
                        </div>
                        )}   
                    </div>
                    <div className="card-base border-radius-20 medico-details-info-card">
                        {isLoading ? <MedicoDescriptionLoader /> : (
                              <div className="morador-details-info-fields">
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">CRM</h6>
                                {doctor?.crm}
                              </div>
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">NOME</h6>
                                {doctor?.name}
                              </div>
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">CELULAR</h6>
                                {doctor?.phone}
                              </div>
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">EMAIL</h6>
                                {doctor?.email}
                              </div>
                              <h1 className="medico-details-large-text-title">
                                   Currículo
                                   </h1>
                               <p className="medico-details-large-text-text">
                                   {doctor?.resume}
                               </p>
                              
                              </div>
                        )}   
                    </div>
                </div>
            </div>

    );
};

export default MedicoDetails;