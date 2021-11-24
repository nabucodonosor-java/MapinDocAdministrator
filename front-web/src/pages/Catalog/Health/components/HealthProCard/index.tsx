import { HealthProfessional } from 'types/healthProfessional';
import './styles.scss';

type Props = {
    hp: HealthProfessional; 
}

const HealthProCard = ({ hp }: Props) => (
    <div className="base-card border-radius-10 medico-card">
        <img src={hp.imgUrl} alt={hp.cardName} className="medico-card-image"/>
        <div className="medico-card-info">
            <h6 className="medico-card-name">
                {hp.cardName}
            </h6>
            <div className="medico-card-especialidade">
                {hp.profession.name}
            </div>
            <div className="medico-card-especializacao">

                {hp.specializations.map(s => {
                    return (
                        <span className="badge rounded-pill bg-secondary mr-2">
                        {s.name}
                    </span>
                     
                    )
                })}        
                         
            </div>  
        </div>
    </div>
);

export default HealthProCard;