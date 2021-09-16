import Pagination from "core/components/Pagination";
import { VisitResponse } from "core/types/visit";
import { formatLocalDate } from "core/utils/format";
import { makePrivateRequest } from "core/utils/request";
import HomeLoader from "pages/Home/components/HomeLoader";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "core/assets/images/arrow.svg";
import "./styles.scss";

const VisitDTbyPeriod = () => {
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [visitData, setVisitData] = useState<VisitResponse>();
  const [activePage, setActivePage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const params = {
      page: activePage,
      size: 100,
      direction: "DESC",
      sort: "visitDate",
    };

    event.preventDefault();
    setVisitData(undefined);

    setIsLoading(true);
    makePrivateRequest({
      url: `/visits/byPeriod?page=${activePage}&first=${firstDate}&second=${secondDate}`,
      params,
    })
      .then((response) => setVisitData(response.data))
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => console.error("ERRO!"));
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="visit-filter-container">
          <div className="visitDT-header">
            <Link to="../" className="visitDT-goback">
              <ArrowIcon className="visitDT-icon-goback" />
              <h3>VOLTAR</h3>
            </Link>
          </div>
          <input
            type="date"
            className="input-base mb-1"
            placeholder="Data inicial"
            value={firstDate}
            onChange={(event) => setFirstDate(event.target.value)}
          />
          <input
            type="date"
            className="input-base mb-1"
            placeholder="Data final"
            value={secondDate}
            onChange={(event) => setSecondDate(event.target.value)}
          />
          <button className="btn btn-primary">Buscar</button>
        </div>
      </form>

      {isLoading ? (
        <HomeLoader />
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>Data</th>
                <th>Cidade</th>
                <th>Especialidade</th>
                <th>Médico Visitado?</th>
                <th>Dr.(a)</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {visitData?.content.map((item) => (
                <tr key={item.id}>
                  <td>{formatLocalDate(item.visitDate, "dd/MM/yyyy")}</td>
                  <td>{item.doctor.placeService.localidade}</td>
                  <td>{item.doctor.specialty.name}</td>
                  <td
                    className={
                      item.success
                        ? "table-field-success text-center"
                        : "table-field-not-success text-center"
                    }
                  >
                    {item.success.toString().toUpperCase()}
                  </td>
                  <td>{item.doctor.name}</td>
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
