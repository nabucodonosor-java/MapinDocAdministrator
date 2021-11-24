import { SocialAssistence } from 'types/socialAssistence';
import './styles.scss';

type Props = {
    social: SocialAssistence; 
}

const SocialProCard = ({ social }: Props) => ( 
    <div className="base-card border-radius-10 social-card-container">
        <div className="social-card-info">
            <h6 className="social-card-name">
                {social.name}
            </h6>
            <div className="social-card-profession">
                {social.profession.name}
            </div>
            <span><strong>Cidade:</strong> {social.placeService.localidade}</span> 
        </div>
       
    </div>
);

export default SocialProCard;