import { Profession } from "types/profession";
import { Link } from "react-router-dom";
import { isAllowedByRole } from "utils/auth";
import "./styles.scss";

type Props = {
  profession: Profession;
  onRemove: (professionId: number) => void; 
}; 

const ProfessionCard = ({ profession, onRemove }: Props) => {
  return (
    <div className="base-card text-center mb-1 p-2 border-radius-20">
      <h5>{profession.name}</h5>
        <div>
          {isAllowedByRole(['ROLE_ADMIN']) && (
            <>
              <Link
                to={`/admin/professions/${profession.id}`}
                type="button"
                className="btn btn-outline-secondary border-radius-10 mr-3">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10"
              onClick={() => onRemove(profession.id)}>
              EXCLUIR
            </button>
            </>    
          )}
      </div>
    </div>
  );
};

export default ProfessionCard;
