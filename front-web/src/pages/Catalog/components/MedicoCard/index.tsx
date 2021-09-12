import { Doctor } from 'core/types/doctor';
import React from 'react';
import './styles.scss';

type Props = {
    doctor: Doctor; 
}

const MedicoCard = ({ doctor }: Props) => (
    <div className="card-base border-radius-10 medico-card">
        <img src={doctor.imgUrl} alt={doctor.cardName} className="medico-card-image"/>
        <div className="medico-card-info">
            <h6 className="medico-card-name">
                {doctor.cardName}
            </h6>
            <div className="medico-card-especialidade">
                {doctor.specialty.name}
            </div>
            <div className="medico-card-especializacao">

                {doctor.specializations.map(s => {
                    return (
                        <span className="badge rounded-pill bg-secondary mr-2">
                        {s.name}
                    </span>
                     
                    )
                })}        
                         
            </div>  
        </div>
    </div>
);

export default MedicoCard;