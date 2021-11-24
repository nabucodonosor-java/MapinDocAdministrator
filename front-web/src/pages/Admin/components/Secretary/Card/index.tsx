import React from "react";
import { Secretary } from "types/secretary";
import { Link } from "react-router-dom";
import { isAllowedByRole } from "utils/auth";
import "./styles.scss";

type Props = {
  secretary: Secretary;
  onRemove: (hpId: number) => void; 
};  

const SecretaryCard = ({ secretary, onRemove }: Props) => {
  return (
    <div className="base-card secretary-card-container">
      <div className="secretary-card-content">
        <h5>{secretary.name}</h5>
        <span className="badge rounded-pill bg-secondary mr-1">
            {secretary.placeService.name}
        </span>
      </div>
          

          {isAllowedByRole(['ROLE_ADMIN']) && (
            <>
              <Link
                to={`/admin/secretaries/${secretary.id}`}
                type="button"
                className="btn btn-outline-secondary border-radius-10 mt-2 mb-1">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10 ml-5"
              onClick={() => onRemove(secretary.id)}>
              EXCLUIR
            </button>
            </>    
          )}  
    </div>
  );
};

export default SecretaryCard;
