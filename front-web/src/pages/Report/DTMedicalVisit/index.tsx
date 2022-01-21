import React, { useState, useCallback, useEffect } from "react";
import { makePrivateRequest } from "utils/request";
import Pagination from "components/Pagination";
import { MedicalVisitResponse } from "types/medicalVisit";
import BasicLoader from "components/Loaders/BasicLoader";
import { formatLocalDate } from "utils/format";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "assets/images/arrow.svg";
import VisitFilters from "components/Filters/VisitFilters";
import "./styles.scss";

const MedicalVisitDT = () => {
  const [visitResponse, setVisitResponse] = useState<MedicalVisitResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [localidade, setLocalidade] = useState("");

  const getVisits = useCallback(() => {
    const params = {
      page: activePage,
      size: 20,
      direction: "DESC",
      sort: "visitDate",
      name,
      profession,
      localidade,
    };
    setIsLoading(true);
    makePrivateRequest({ url: `/visits?page=${activePage}`, params })
      .then((response) => setVisitResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, name, profession, localidade]);

  useEffect(() => {
    getVisits();
  }, [getVisits]);

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

  const clearFilters = () => {
    setActivePage(0);
    setName("");
    setProfession("");
    setLocalidade("");
  };

  return (
    <div>
      <div>
        <Link to="/" className="details-goback">
          <ArrowIcon />
          <h2>voltar</h2>
        </Link>
      </div>
      <VisitFilters
        name={name}
        profession={profession}
        localidade={localidade}
        handleChangeName={handleChangeName}
        handleChangeProfession={handleChangeProfession}
        handleChangeLocalidade={handleChangeLocalidade}
        clearFilters={clearFilters}
      />
      <h1 className="text-center mt-2">TODAS AS VISITAS</h1>

      <div className="admin-list-container">
        {isLoading ? (
          <BasicLoader />
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cidade</th>
                  <th>Profissional</th>
                  <th>Visitado?</th>
                  <th>Dr.(a)</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {visitResponse?.content.map((item) => (
                  <tr key={item.id}>
                    <td>{formatLocalDate(item.visitDate, "dd/MM/yyyy")}</td>
                    <td>{item.healthPro.placeService.localidade}</td>
                    <td>{item.healthPro.profession.name}</td>
                    <td>{item.success ? "SIM" : "NÃO"}</td>
                    <td>{item.healthPro.name}</td>
                    <td className="visitDT-field-description">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {visitResponse && (
          <Pagination
            totalPages={visitResponse.totalPages}
            onChange={(page) => setActivePage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default MedicalVisitDT;
