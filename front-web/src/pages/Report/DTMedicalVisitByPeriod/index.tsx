import Pagination from "components/Pagination";
import { MedicalVisitResponse } from "types/medicalVisit";
import { formatLocalDate } from "utils/format";
import { makePrivateRequest } from "utils/request";
import BasicLoader from "components/Loaders/BasicLoader";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "assets/images/arrow.svg";
import VisitFilters from "components/Filters/VisitFilters";
import "./styles.scss";

const VisitDTbyPeriod = () => {
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [visitData, setVisitData] = useState<MedicalVisitResponse>();
  const [activePage, setActivePage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [localidade, setLocalidade] = useState("");

  const getVisitsByPeriod = useCallback(() => {
    const params = {
      page: activePage,
      size: 20,
      name,
      profession,
      localidade,
    };

    setIsLoading(true);
    makePrivateRequest({
      url: `/visits/byPeriod?page=${activePage}&first=${firstDate}&second=${secondDate}`,
      params,
    })
      .then((response) => setVisitData(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, profession, localidade, firstDate, secondDate, name]);

  useEffect(() => {
    getVisitsByPeriod();
  }, [getVisitsByPeriod]);

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
    setFirstDate("");
    setSecondDate("");
  };

  return (
    <div className="dt-medicalV-period-container">
      <div>
        <Link to="/" className="details-goback">
          <ArrowIcon />
          <h2>voltar</h2>
        </Link>
      </div>

      <div className="dt-medicalV-period-form">
        <input
          type="date"
          className="base-input"
          placeholder="Data inicial"
          value={firstDate}
          onChange={(event) => setFirstDate(event.target.value)}
        />
        <input
          type="date"
          className="base-input"
          placeholder="Data final"
          value={secondDate}
          onChange={(event) => setSecondDate(event.target.value)}
        />

        <VisitFilters
          name={name}
          profession={profession}
          localidade={localidade}
          handleChangeName={handleChangeName}
          handleChangeProfession={handleChangeProfession}
          handleChangeLocalidade={handleChangeLocalidade}
          clearFilters={clearFilters}
        />
      </div>

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
              {visitData?.content.map((item) => (
                <tr key={item.id}>
                  <td>{formatLocalDate(item.visitDate, "dd/MM/yyyy")}</td>
                  <td>{item.healthPro.placeService.localidade}</td>
                  <td>{item.healthPro.profession.name}</td>
                  <td
                    className={
                      item.success
                        ? "table-field-success text-center"
                        : "table-field-not-success text-center"
                    }
                  >
                    {item.success.toString().toUpperCase()}
                  </td>
                  <td>{item.healthPro.name}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {visitData && (
        <Pagination
          totalPages={visitData.totalPages}
          onChange={(page) => setActivePage(page)}
        />
      )}
    </div>
  );
};

export default VisitDTbyPeriod;
