import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HealthProfessionalResponse } from "types/healthProfessional";
import { Specialization } from "types/specialization";
import { makePrivateRequest } from "utils/request";
import HealthProCard from "./components/HealthProCard";
import CardLoader from "components/Loaders/CardLoaders";
import Pagination from "components/Pagination";
import HealthProFilters from "components/Filters/HealthProFilters";
import "./styles.scss";

const HealthCatalog = () => {
  const [hpResponse, setHPResponse] = useState<HealthProfessionalResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [specialization, setSpecialization] = useState<Specialization>();

  const getHP = useCallback(() => {
    const params = {
      page: activePage,
      size: 8,
      name,
      profession,
      localidade,
      specializationId: specialization?.id,
    };

    setIsLoading(true);
    makePrivateRequest({ url: "/hp", params })
      .then((response) => setHPResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activePage, name, profession, localidade, specialization]);

  useEffect(() => {
    getHP();
  }, [getHP]);

  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  };

  const handleChangeProfession = (profession: string) => {
    setActivePage(0);
    setProfession(profession);
  };

  const handleChangeLocalidade = (localidade: string) => {
    setActivePage(0);
    setLocalidade(localidade);
  };

  const handleChangeSpecialization = (specialization: Specialization) => {
    setActivePage(0);
    setSpecialization(specialization);
  };

  const clearFilters = () => {
    setActivePage(0);
    setSpecialization(undefined);
    setName("");
    setProfession("");
    setLocalidade("");
  };

  return (
    <div className="hp-catalog-container">
      <h4 className="text-center mb-3">
        Catálogo de Médicos(as), Fisios e TO´s
      </h4>
      <div className="hp-catalog-filter-container">
        <HealthProFilters
          name={name}
          profession={profession}
          localidade={localidade}
          specialization={specialization}
          handleChangeSpecialization={handleChangeSpecialization}
          handleChangeName={handleChangeName}
          handleChangeProfession={handleChangeProfession}
          handleChangeLocalidade={handleChangeLocalidade}
          clearFilters={clearFilters}
        />
      </div>
      <div className="hp-catalog">
        {isLoading ? (
          <CardLoader />
        ) : (
          hpResponse?.content.map((hp) => (
            <Link
              className="active-catalog-card"
              to={`/hp/${hp.id}`}
              key={hp.id}
            >
              <HealthProCard hp={hp} />
            </Link>
          ))
        )}
      </div>
      {hpResponse && (
        <Pagination
          totalPages={hpResponse.totalPages}
          onChange={(page) => setActivePage(page)}
        />
      )}
    </div>
  );
};

export default HealthCatalog;
