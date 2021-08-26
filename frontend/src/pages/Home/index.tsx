import MainImage from 'assets/images/main-image2.jpeg';
import ButtonIcon from 'components/ButtonIcon';

import './styles.css';

const Home = () => { 
  return (
   
      <div className="home-container">
        <div className="base-card home-card">
          <div className="home-content-container">
            <div className="home-content-marketing">
              <h4>Área de Trade&Marketing</h4>
              <p>
                Coleta de dados para otimizar a sua estratégia de trade
                marketing, alavancando suas vendas
              </p>
              <ButtonIcon text="Trade & Marketing" img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-trade.png" />
            </div>
            <div className="home-content-technical">
              <h4>Área Técnica (Laboratório)</h4>
              <p>
                Dashboard com acompanhamento dos serviços da
                área técnica
              </p>
              <ButtonIcon text="Laboratório Ortopédico" img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-lab.png" />
            </div>
          </div>

          <div className="home-image-container">
            <img src={MainImage} alt="logo" />
          </div>
        </div>
      </div>
 
  );
};

export default Home;
