import { PlaceService } from "types/placeService";
import "./styles.scss";

type Props = {
  place: PlaceService;
};

const ApaeCard = ({ place }: Props) => (
  <div className=" base-card border-radius-10 place-card-container">
    <h4>{place.name}</h4>
    <div className="place-card-info">
      <span>
        <strong>Endereço: </strong>
        {place.logradouro} - {place.complemento}
      </span>
      <span>
        <strong>Cidade: </strong>
        {place.localidade} - {place.uf}
      </span>
    </div>
    <div className="place-card-pro">
      <h5>Corpo Clínico</h5>
      {place.healthPro.map((s) => {
        return (
          <span className="badge rounded-pill bg-primary mr-2">{s.name}</span>
        );
      })}
    </div>
  </div>
);

export default ApaeCard;
