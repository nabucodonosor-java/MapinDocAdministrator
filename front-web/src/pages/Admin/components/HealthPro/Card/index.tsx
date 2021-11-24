import React from "react";
import { HealthProfessional } from "types/healthProfessional";
import { Link } from "react-router-dom";
import "./styles.scss";
import { isAllowedByRole } from "utils/auth";

type Props = {
  hp: HealthProfessional;
  onRemove: (hpId: number) => void; 
};  

const HealthCard = ({ hp, onRemove }: Props) => {
  return (
    <div className="base-card hp-admin-card-container">
      <div className="hp-admin-card-img">
        <img src={hp.imgUrl} alt={hp.name} />
        <h5>{hp.cardName}</h5>
        <p>{hp.profession.name}</p>
      </div>

      <div className="hp-admin-card-specializations"> 
        <div>
        <h6>Especializações</h6>
        {hp.specializations.map((s) => {
          return (
            <span className="badge rounded-pill bg-secondary mr-1">
              {s.name}
            </span>
          );
        })}
        </div>

          {isAllowedByRole(['ROLE_ADMIN']) && (
            <>
              <Link
                to={`/admin/hp/${hp.id}`}
                type="button"
                className="btn btn-outline-secondary border-radius-10 mt-2 mb-1">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10"
              onClick={() => onRemove(hp.id)}>
              EXCLUIR
            </button>
            </>    
          )}  
          </div>
    </div>
  );
};

export default HealthCard;
