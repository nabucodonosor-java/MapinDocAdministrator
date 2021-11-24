import { useEffect, useState } from 'react';
import HomeImg from 'assets/images/main-image.jpeg';
import ProHealth from 'assets/images/health-pro-img.jpeg';
import ProSocial from 'assets/images/social-pro-img.jpeg';
import Prescription from 'assets/images/prescription-img.jpeg';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request';
import BasicLoader from 'components/Loaders/BasicLoader';
import Slide1 from 'assets/images/slide1.jpeg';
import Slide2 from 'assets/images/slide2.jpeg';
import Slide3 from 'assets/images/slide3.jpeg';
import Slide4 from 'assets/images/slide4.jpg';
import Target from 'assets/images/target.jpeg';
import './styles.scss'; 

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    makePrivateRequest({ url: "/" })
      .then((response) => response.data)
      .finally(() => setIsLoading(false));
  }, []);

    return (
      <>
      {isLoading ? ( 
        <BasicLoader />
      ) : (
        <div className="home-container"> 
            <div className="home-title">
              <p><span><strong>DocAdmin</strong></span> <br/>Gerencie tudo que é necessário<br/> para impulsionar seu marketing<br/>  e suas vendas  </p>
              <img src={HomeImg} alt="DocAdmin" />
            </div>

            <div className="home-target"> 
              <img src={Target} alt="DocAdmin" />
              <p>O objetivo do DocAdmin é ser funcional, interativo e capaz de receber atualizações constantes</p>
            </div>

            <div className="home-sections">
              <div className="home-sections-img">
                <p><span><strong>Médicos, Fisios e TO´s</strong></span></p>
                <img src={ProHealth} alt="DocAdmin" />                           
              </div>
              <div className="home-sections-btn"> 
                <Link to="/hp">
                  <Button text={'catálogo'} /> 
                </Link>
                <Link to="/hp/pro/byDay">
                  <Button text={'busca por período'} /> 
                </Link> 
                <Link to="/visits">
                  <Button text={'visitas'} />
                </Link>
                <Link to="/visits/byperiod">
                  <Button text={'visitas por período'} />
                </Link>                     
              </div>
            </div>

            <div className="home-sections">
              <div className="home-sections-img">
                <p><span><strong>Receitas Médicas</strong></span></p>
                <img src={Prescription} alt="DocAdmin" />                             
              </div>
              <div className="home-sections-btn padd-social">
                <Link to="/admin/prescriptions">
                  <Button text={'Cadastrar Receita'} />
                </Link>
                <Link to="/dashboard-prescription">
                  <Button text={'Dashboard'} />
                </Link>
                                       
              </div>
            </div>

            <div className="home-sections">
              <div className="home-sections-img">
                <p><span><strong>Assistência Social & Apaes</strong></span></p>
                <img src={ProSocial} alt="DocAdmin" />                            
              </div>
              <div className="home-sections-btn">
                <Link to="/social">
                  <Button text={'Assist. Sociais'} />
                </Link>
                <Link to="/apae">
                  <Button text={'apaes'} />
                </Link>                      
              </div>
            </div>

            <div className="home-carousel">
            <div className="home-carousel-item text-center">
                <Link to="dash-helth-pro">
                <h6>Dashboars Gerenciais para Área de Marketing</h6>
                <img src={Slide4} alt="slide4" />
                </Link>
              </div>
              <div className="home-carousel-item text-center">
                <Link to="/hp">
                <h6>Catalógo de Profissionais da Saúde</h6>
                <img src={Slide1} alt="slide1" />
                </Link>
              </div>
              <div className="home-carousel-item text-center">
                <Link to="dashboard-prescription">
                <h6>Ranking de Profissionais por Receitas</h6>
                <img src={Slide2} alt="slide2" />
                </Link>
              </div>
              <div className="home-carousel-item text-center">
                <Link to="dash-apae-social">
                <h6>Informações de Assist. Sociais e Apaes</h6>
                <img src={Slide3} alt="slide3" />
                </Link>
              </div>             
            </div>
        </div>
      )}
      </>  
    );
}

export default Home;