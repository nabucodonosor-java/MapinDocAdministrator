import React from "react";
import { Prescription } from "types/prescription";
import { Link } from "react-router-dom";
import { isAllowedByRole } from "utils/auth";
import "./styles.scss";
import { formatLocalDate } from "utils/format";

type Props = {
  prescription: Prescription;
  onRemove: (prescriptionId: number) => void; 
}; 

const PrescriptionCard = ({ prescription, onRemove }: Props) => {
  return (
    <div className="base-card prescription-admin-card-container mb-2">
                    
      <table className="table">
        <tr>
          <th>Data</th>
          <th>Profissional</th>
        </tr>
        <tr>
          <td>
            {formatLocalDate(prescription.prescriptionDate, "dd/MM/yyyy")}
          </td>
          <td>
            {prescription.healthPro.name}
          </td>
        </tr>
      </table>
     
        <div className="place-admin-card-btn">
          {isAllowedByRole(['ROLE_ADMIN']) && (
            <>
              <Link
                to={`/admin/prescriptions/${prescription.id}`}
                type="button"
                className="btn btn-outline-secondary border-radius-10 mr-3">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10"
              onClick={() => onRemove(prescription.id)}>
              EXCLUIR
            </button>
            </>    
          )}
      </div>
    </div>
  );
};

export default PrescriptionCard;
