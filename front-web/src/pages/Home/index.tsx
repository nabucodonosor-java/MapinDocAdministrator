import React, { useEffect, useState } from "react";
import ButtonIcon from "core/components/ButtonIcon";
import { Link } from "react-router-dom";
import { makePrivateRequest } from "core/utils/request";
import HomeLoader from "./components/HomeLoader";
import HomeImg from "core/assets/images/main-image3.jpeg";
import MktImg from "core/assets/images/main-image.jpeg";
import LabImg from "core/assets/images/main-image2.jpeg";
import Apae from "core/assets/images/apae.png";
import DocVisits from "core/assets/images/doc-visits.jpeg";
import Button from "core/components/Button";
import Footer from "core/components/Footer";
import "./styles.scss";

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
        <HomeLoader />
      ) : (
        <div className="home-container"> 
            <div className="home-title">
              <p><span><strong>DocAdmin</strong></span> <br/>Gerencie tudo que é necessário<br/> para impulsionar seu marketing<br/>  e suas vendas  </p>
              <img src={HomeImg} alt="mkt" />
            </div>
            
            <div className="home-card-list">
              <div className="card-base home-card-container">
                <h4>Busca Médicos</h4>
                <img src={MktImg} alt="mkt" className="mb-3" />

                <Link to="/doctors">
                  <ButtonIcon
                    text="Busca Médicos"
                    img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-trade.png"
                  />
                </Link>

                <Link to="/report/doctors/byDays">
                  <ButtonIcon
                    text="Por atendimento"
                    img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-trade.png"
                  />
                </Link>
              </div>
              <div className="card-base home-card-container">
                <h4>Visitas Médicas</h4>
                <img src={DocVisits} alt="mkt" className="mb-3" />
             
                <Link to="/visits">
                  <Button
                    text="Todas"
                  />
                </Link>
                <Link to="/visits/byPeriod">
                  <Button
                    text="Por Período"
                  />
                </Link>
              
              </div>
              <div className="card-base home-card-container">
                <h4>Área Técnica</h4>
                <img src={LabImg} alt="mkt" className="mb-3" />
                <Link to="/lab">
                  <ButtonIcon
                    text="Serviços"
                    img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-lab.png"
                  />
                </Link>
              </div>

              <div className="card-base home-card-container">
                <h4>Apaes & Fundo Sociais</h4>
                <img src={Apae} alt="mkt" className="mb-3" />
                <Link to="/lab">
                  <ButtonIcon
                    text="Apae"
                    img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-lab.png"
                  />
                </Link>
                <Link to="/lab">
                  <ButtonIcon
                    text="Assistência Social"
                    img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-lab.png"
                  />
                </Link>
              </div>
          </div>
         
        <Footer />
        </div>
      )}
    </>
  );
};
export default Home;
