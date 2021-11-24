import { SocialAssistence } from "types/socialAssistence";
import { Link } from "react-router-dom";
import "./styles.scss";
import { isAllowedByRole } from "utils/auth";

type Props = {
  social: SocialAssistence;
  onRemove: (socialId: number) => void;  
};  

const SocialCard = ({ social, onRemove }: Props) => {
  return (
    <div className="base-card admin-social-card">
      <div>
        <h5>{social.name}</h5>
        <p>{social.profession.name}</p>
      </div>

        {isAllowedByRole(['ROLE_ADMIN']) && (
          <>
            <Link
              to={`/admin/social/${social.id}`}
              type="button"
              className="btn btn-outline-secondary border-radius-10 mt-2 mb-1">
              EDITAR
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger border-radius-10"
              onClick={() => onRemove(social.id)}>
              EXCLUIR
            </button>
            </>    
          )}  
    </div>
  );
};

export default SocialCard;
