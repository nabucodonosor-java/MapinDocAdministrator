import "./styles.scss";

type Props = {
  name: string;
  logradouro: string;
  complemento: string;
  localidade: string;
  uf: string;
};

const HealthProPlaceService = ({
  name,
  logradouro,
  complemento,
  localidade,
  uf,
}: Props) => {
  return (
    <div className="hp-places-container">
      <span>
        <strong>Nome: </strong>
        {name}
      </span>
      <span>
        <strong>Endereço: </strong>
        {logradouro} <strong>Complemento: </strong>
        {complemento}
      </span>
      <span>
        <strong>Cidade: </strong>
        {localidade} <strong>UF: </strong>
        {uf}
      </span>
    </div>
  );
};

export default HealthProPlaceService;
