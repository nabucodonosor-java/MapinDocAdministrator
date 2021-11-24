import { MedicalVisit } from "types/medicalVisit";
import { formatLocalDate } from "utils/format";
import { Link } from "react-router-dom";
import "./styles.scss";

type Props = { 
  visit: MedicalVisit;
  onRemove: (visitId: number) => void; 
}; 

const Card = ({ visit, onRemove }: Props) => {
  return (
    <div className="base-card admin-visit-card-container mb-2">

      <div className="admin-visit-card-img">
        <h5>{`Data: ${formatLocalDate(visit.visitDate, "dd/MM/yyyy")}`}</h5>
        <p>{visit.healthPro.name}</p>
        <p>{visit.success}</p>
      </div>

      <div className="admin-visit-card-description"> 
        <h6>Descrição</h6>
        {visit.description}
      </div>
      <div className="admin-visit-card-btn">
        <Link
          to={`/admin/visits/${visit.id}`}
          type="button"
          className="btn btn-outline-secondary border-radius-10 mr-3"
        >
          EDITAR
        </Link>

        <button
          type="button"
          className="btn btn-outline-danger border-radius-10"
          onClick={() => onRemove(visit.id)}
        >
          EXCLUIR
        </button>
      </div>

    </div>
  );
};

export default Card;