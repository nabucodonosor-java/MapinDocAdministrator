import { Visit } from "core/types/visit";
import { formatLocalDate } from "core/utils/format";
import { Link } from "react-router-dom";
import "./styles.scss";

type Props = {
  visit: Visit;
  onRemove: (visitId: number) => void; 
}; 

const Card = ({ visit, onRemove }: Props) => {
  return (
    <div className="card-base admin-card-container">
      <div className="admin-card-img">
        <h5>{`Data: ${formatLocalDate(visit.visitDate, "dd/MM/yyyy")}`}</h5>
        <p>{`Médico: ${visit.doctor.name}`}</p>
        <p>{visit.success}</p>
      </div>

      <div className="admin-card-specializations"> 
        <h6>Descrição</h6>
        {visit.description}
        </div>
        <div className="admin-card-btn">
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
