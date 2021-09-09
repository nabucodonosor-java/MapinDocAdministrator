import React from "react";
import { PlaceService } from "core/types/placeService";
import { Link } from "react-router-dom";
import "./styles.scss";

type Props = {
  place: PlaceService;
  onRemove: (placeId: number) => void; 
}; 

const Card = ({ place, onRemove }: Props) => {
  return (
    <div className="card-base admin-card-container">
      <div className="admin-card-title">
        <h5>{place.name}</h5>
        <p>{place.city}</p>
      </div> 

      <div className="admin-card-content">
        <div className="admin-card-address">
        <table className="table doctor-form-table">
                <tr>
                  <th>Rua</th>
                  <th>N.º</th>
                  <th>Bairro</th>
                </tr>
                <tr>
                  <td>
                    <label>{place.street}</label>
                  </td>
                  <td>
                  <label>{place.complement}</label>
                  </td>
                  <td>
                  <label>{place.district}</label>
                  </td>
                </tr>
                
              </table>
    
        </div>
        </div>
        <div className="admin-card-btn">
        <Link
          to={`/admin/places/${place.id}`}
          type="button"
          className="btn btn-outline-secondary border-radius-10 mr-3"
        >
          EDITAR
        </Link>

        <button
          type="button"
          className="btn btn-outline-danger border-radius-10"
          onClick={() => onRemove(place.id)}
        >
          EXCLUIR
        </button>
      </div>
    </div>
  );
};

export default Card;
