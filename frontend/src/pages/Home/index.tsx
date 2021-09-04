import React, { useEffect, useState } from "react";
import ButtonIcon from "core/components/ButtonIcon";
import { Link } from "react-router-dom";
import { makePrivateRequest } from "core/utils/request";
import HomeLoader from "./components/HomeLoader";
import MktImg from 'core/assets/images/main-image.jpeg';
import LabImg from 'core/assets/images/main-image2.jpeg';
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
          <div className="card-base home-card-container">
            <h1>Marketing</h1>
            <p>
              Base de Dados de visitação de Ribeirão Preto e região,
              Araraquara/São Carlos e micro região.
            </p>
            <img src={MktImg} alt="mkt" className="mb-3"/>
            <Link to="/doctors">
            <ButtonIcon
                text="Busca Médicos"
                img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-trade.png"
              />
            </Link>
          </div>
          <div className="card-base home-card-container">
            <h1>Área Técnica</h1>
            <p>
              Análise via dashboard dos serviços do laboratório ortopédico com
              gráficos por técnico ortopédico
            </p>
            <img src={LabImg} alt="mkt" className="mb-3"/>
            <Link to="/lab">
            <ButtonIcon
                text="Acompanhe Serviços"
                img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-lab.png"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
