import Pagination from "core/components/Pagination";
import { VisitResponse } from "core/types/visit";
import { formatLocalDate } from "core/utils/format";
import { makePrivateRequest } from "core/utils/request";
import HomeLoader from "pages/Home/components/HomeLoader";
import React, { useState } from "react";
import './styles.scss';

const App = () => {
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
        
            <h5 className="text-center">Busca Visitas por Período</h5>
            <form className="search-form" onSubmit={handleSubmit}>
            <div className="visit-filter-container">
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
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th className="text-center">Data</th>
                <th className="text-center">Médico Visitado?</th>
                <th>Dr.(a)</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {visitData?.content.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    {formatLocalDate(item.visitDate, "dd/MM/yyyy")}
                  </td>
                  <td className="text-center">
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

export default App;
