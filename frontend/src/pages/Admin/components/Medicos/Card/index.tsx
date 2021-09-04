import React from 'react';
import { Doctor } from 'core/types/doctor';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    doctor: Doctor;
    onRemove: (doctorId: number) => void;
} 

const Card = ({ doctor, onRemove }: Props) => {

    return ( 
        <div className="card-base medico-card-admin">
                <div className="text-center border-right py-3">
                    <img src={doctor.imgUrl}
                    alt={doctor.name} className="medico-card-img-admin" />
                </div>
                <div className="col-7 py-3">
                    {doctor.specialty.name}
                    <h3 className="card-content medico-card-name-admin mt-2 mb-2">
                        {doctor.cardName}
                    </h3>
                    <div>
                        
                        <span className="badge rounded-pill bg-secondary mr-2">
                                {doctor?.specializations.map(c => " - " + c.name + " - ")}
                        </span>
                         
                    </div>
                         
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link
                    to={`/admin/doctors/${doctor.id}`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                    onClick={() => onRemove(doctor.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
    )
}

export default Card;