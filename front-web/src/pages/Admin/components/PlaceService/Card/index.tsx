import React from "react";
import { PlaceService } from "types/placeService";
import { Link } from "react-router-dom";
import { isAllowedByRole } from "utils/auth";
import "./styles.scss";

type Props = {
  place: PlaceService;
  onRemove: (placeId: number) => void; 
}; 

const HealthCard = ({ place, onRemove }: Props) => {
  return (
    <div className="base-card place-admin-card-container mb-2">
      <h3>{place.name}</h3>
      <table className="table text-center"> 
        <tr>
          <th>Endereço</th>
          <th>Compl</th>
        </tr>
        <tr>
          <td>
            {place.logradouro}
          </td>
          <td>
            {place.complemento}
          </td>
        </tr>    
        <br/>
        <tr>
          <th>Bairro</th>
          <th>Cidade</th>
        </tr>
        <tr>
          <td>
            {place.bairro}
          </td>
          <td>
            {place.localidade}
          </td>
        </tr>        
      </table>
     
                
      
     
        <div className="place-admin-card-btn">
          {isAllowedByRole(['ROLE_ADMIN']) && (
            <>
              <Link
                to={`/admin/places/${place.id}`}
                type="button"
                className="btn btn-outline-secondary border-radius-10 mr-3">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10"
              onClick={() => onRemove(place.id)}>
              EXCLUIR
            </button>
            </>    
          )}
      </div>
    </div>
  );
};

export default HealthCard;
