import React from "react";
import { Doctor } from "core/types/doctor";
import { Link } from "react-router-dom";
import "./styles.scss";

type Props = {
  doctor: Doctor;
  onRemove: (doctorId: number) => void; 
}; 

const Card = ({ doctor, onRemove }: Props) => {
  return (
    <div className="card-base admin-card-container">
      <div className="admin-card-img">
        <img src={doctor.imgUrl} alt={doctor.name} />
        <h5>{doctor.cardName}</h5>
        <p>{doctor.specialty.name}</p>
      </div>

      <div className="admin-card-specializations"> 
        <h6>Especializações</h6>
        {doctor.specializations.map((s) => {
          return (
            <span className="badge rounded-pill bg-secondary mb-2 mr-1">
              {s.name}
            </span>
          );
        })}
        </div>
        <div className="admin-card-btn">
        <Link
          to={`/admin/doctors/${doctor.id}`}
          type="button"
          className="btn btn-outline-secondary border-radius-10 mr-3"
        >
          EDITAR
        </Link>

        <button
          type="button"
          className="btn btn-outline-danger border-radius-10"
          onClick={() => onRemove(doctor.id)}
        >
          EXCLUIR
        </button>
      </div>
    </div>
  );
};

export default Card;
