import Pagination from "core/components/Pagination";
import { DoctorResponse } from "core/types/doctor";
import { makePrivateRequest } from "core/utils/request";
import HomeLoader from "pages/Home/components/HomeLoader";
import React, { useState } from "react";
import './styles.scss';

const DoctorDTbyDaysOfWeek = () => {

  const [day, setDay] = useState("/byMonday");
  const [doctorData, setDoctorData] = useState<DoctorResponse>();
  const [activePage, setActivePage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const params = {
      page: activePage,
      size: 100,
      direction: "ASC",
      sort: "name",
    };

    event.preventDefault();
    setDoctorData(undefined);

    setIsLoading(true);
    makePrivateRequest({
      url: `/doctors${day}`,
      params,
    })
      .then((response) => setDoctorData(response.data))
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => console.error("ERRO!"));
  };

  return (
    <div className="p-3">
      <h6 className="text-center mb-1">Dr.(a) por dia de atendimento</h6>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="doc-filters-days-container">
        <select
          className="input-base form-control"
          value={day}
          onChange={(e) => {
            const selectedDay = e.target.value;
            setDay(selectedDay);
          }}
        >
          <option value="/byMonday">Segunda-feira</option>
          <option value="/byTuesday">Terça-feira</option>
          <option value="/byWednesday">Quarta-feira</option>
          <option value="/byThursday">Quinta-feira</option>
          <option value="/byFriday">Sexta-feira</option>
        </select>
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
              <th className="text-center">Cidade</th>
                <th className="text-center">Especialidade</th>
                <th className="text-center">Especializações</th>
                <th className="text-center">Nome do Dr.(a)</th>
                <th>Horários de Atendimento</th>
              </tr>
            </thead>
            <tbody>
              {doctorData?.content.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    {item.placeService.localidade}
                  </td>
                  <td className="text-center">
                    {item.specialty.name}
                  </td>
                  <td className="text-center">
                    {item.specializations.map(s => s.name + " ")}
                  </td>
                  <td className="text-center">
                    {item.name}
                  </td>
                  <td>{item.officeHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {doctorData && (
        <Pagination
          totalPages={doctorData.totalPages}
          onChange={(page) => setActivePage(page)}
        />
      )}
      
    </div>
  );
}

export default DoctorDTbyDaysOfWeek;
