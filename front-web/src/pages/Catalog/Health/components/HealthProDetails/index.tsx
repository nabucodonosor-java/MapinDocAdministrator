/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "assets/images/arrow.svg";
import { makePrivateRequest } from "utils/request";
import { HealthProfessional } from "types/healthProfessional";
import InfoLoader from "components/Loaders/InfoLoaders";
import DescriptionLoader from "components/Loaders/DescriptionLoaders";
import HealthProOfficeHours from "components/HealthProOfficeHours";
import HealthProPlaceService from "components/HealthProPlaceService";

import "./styles.scss";

type ParamsType = {
  hpId: string;
};

const HealthProDetails = () => {
  const { hpId } = useParams<ParamsType>();
  const [hp, setHP] = useState<HealthProfessional>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    makePrivateRequest({ url: `/hp/${hpId}` })
      .then((response) => setHP(response.data))
      .finally(() => setIsLoading(false));
    window.scrollTo(0, 0);
  }, [hpId]);

  return (
    <div className="hp-details-container">
      <div>
        <Link to="/hp" className="details-goback">
          <ArrowIcon />
          <h2>voltar</h2>
        </Link>
      </div>
      <div className="hp-details-cards">
        {isLoading ? (
          <InfoLoader />
        ) : (
          <div className="base-card border-radius-20 hp-details-content-img mr-3">
            <img src={hp?.imgUrl} alt={hp?.name} />
            <h6>{hp?.name}</h6>
            <h4>{hp?.profession.name}</h4>
            <h5>Especializações Clínicas</h5>
            {hp?.specializations.map((s) => {
              return (
                <span className="badge rounded-pill bg-primary mr-2">
                  {s.name}
                </span>
              );
            })}
            <div className="base-card hp-details-places">
              <h5>Local de Visitação</h5>
              <HealthProPlaceService
                name={
                  hp?.placeService.name === undefined
                    ? "sem nome"
                    : hp.placeService.name
                }
                logradouro={
                  hp?.placeService.logradouro === undefined
                    ? "sem endereço"
                    : hp.placeService.logradouro
                }
                complemento={
                  hp?.placeService.complemento === undefined
                    ? "sem complemento"
                    : hp.placeService.complemento
                }
                localidade={
                  hp?.placeService.localidade === undefined
                    ? "sem cidade"
                    : hp.placeService.localidade
                }
                uf={
                  hp?.placeService.uf === undefined
                    ? "sem uf"
                    : hp.placeService.uf
                }
              />
            </div>
          </div>
        )}
        <br />
        {isLoading ? (
          <DescriptionLoader />
        ) : (
          <div className="base-card border-radius-20 hp-details-content-info">
            <div className="hp-details-info">
              <h4>Informações</h4>
              <span>
                <strong>CRM/CREDITO: </strong>
                {hp?.register}
              </span>

              <span>
                <strong>NOME: </strong>
                {hp?.name}
              </span>

              <span>
                <strong>CELULAR: </strong>
                {hp?.phone == undefined ? "sem celular cadastrado" : hp.phone}
              </span>

              <span>
                <strong>EMAIL: </strong>
                {hp?.email == undefined ? "sem e-mail cadastrado" : hp.email}
              </span>
              <h4>Currículo&Observações</h4>

              <p>{hp?.resume}</p>
            </div>

            <h4>Horários de Atendimentos</h4>
            <HealthProOfficeHours
              seg={hp?.seg === undefined ? hp?.seg === false : hp?.seg}
              segPeriod={hp?.segPeriod === undefined ? "" : hp.segPeriod}
              ter={hp?.ter === undefined ? hp?.ter === false : hp?.ter}
              terPeriod={hp?.terPeriod === undefined ? "" : hp.terPeriod}
              qua={hp?.qua === undefined ? hp?.qua === false : hp?.qua}
              quaPeriod={hp?.quaPeriod === undefined ? "" : hp.quaPeriod}
              qui={hp?.qui === undefined ? hp?.qui === false : hp?.qui}
              quiPeriod={hp?.quiPeriod === undefined ? "" : hp.quiPeriod}
              sex={hp?.sex === undefined ? hp?.sex === false : hp?.sex}
              sexPeriod={hp?.sexPeriod === undefined ? "" : hp.sexPeriod}
              sab={hp?.sab === undefined ? hp?.sab === false : hp?.sab}
              sabPeriod={hp?.sabPeriod === undefined ? "" : hp.sabPeriod}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthProDetails;
