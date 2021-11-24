import React, { useCallback, useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { HealthProfessionalResponse } from "types/healthProfessional";
import { makePrivateRequest } from "utils/request";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import BasicLoader from "components/Loaders/BasicLoader";
import HealthProFiltersByDay from "components/Filters/HealthProFiltersByDay";
import './styles.scss';
import { Specialization } from "types/specialization";

const DTHealthProByDay = () => {

  const [day, setDay] = useState('/byMonday');
  const [hpResponse, setHPResponse] = useState<HealthProfessionalResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [periodo, setPeriodo] = useState('');
  const [profession, setProfession] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [specialization, setSpecialization] = useState<Specialization>();

    const getHP = useCallback(() => {
        const params = {
            page: activePage,
            size: 10,
            periodo,
            profession,
            localidade,
            specializationId: specialization?.id
        }

        setIsLoading(true);
        makePrivateRequest({ url: `/hp${day}`, params })
            .then(response => setHPResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, periodo, profession, localidade, day, specialization]);

    useEffect(() => {
        getHP();
    }, [getHP]);

    const handleChangePeriodo = (periodo: string) => {
        setActivePage(0);
        setPeriodo(periodo);
    }

    const handleChangeProfession = (profession: string) => {
        setActivePage(0);
        setProfession(profession);
    }

    const handleChangeLocalidade = (localidade: string) => {
        setActivePage(0);
        setLocalidade(localidade);
    }

    const handleChangeSpecialization = (specialization: Specialization) => {
        setActivePage(0);
        setSpecialization(specialization);
    }

    const clearFilters = () => {
        setActivePage(0);
        setSpecialization(undefined);
        setPeriodo('');
        setProfession('');
        setLocalidade('');
    }

  return (
    <div className="dt-healthByDay-container"> 
       
          <Link to="/" className="details-goback p-2">
            <ArrowIcon/>
            <h3>VOLTAR</h3>
          </Link>   

      <div className="dt-healthByDay-filters-container"> 
        <div className="base card border-radius-20 dt-healthByDay-filters mb-2">
          <h4>BUSCA POR DIA DA SEMANA</h4>
          <div className="dt-healthByDay-filters-inputs">
            <span><strong>Escolha o dia da semana: </strong></span>
            <select
            className="form-control base-input"
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
            <option value="/bySaturday">Sábado</option>
            </select>
          </div>
      </div>
      <HealthProFiltersByDay
          periodo={periodo}
          profession={profession}
          localidade={localidade}
          specialization={specialization}
          handleChangeSpecialization={handleChangeSpecialization}
          handleChangePeriodo={handleChangePeriodo}
          handleChangeProfession={handleChangeProfession}
          handleChangeLocalidade={handleChangeLocalidade}
          clearFilters={clearFilters}
          />
      </div>
      {isLoading ? (
        <BasicLoader />
      ) : (
        <div className="table-responsive dt-healthByDay-table">
          <table className="table table-hover table-sm">
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
              {hpResponse?.content.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    {item.placeService.localidade}
                  </td>
                  <td className="text-center">
                    {item.profession.name}
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
          {hpResponse && (
            <Pagination
              totalPages={hpResponse.totalPages}
              onChange={(page) => setActivePage(page)}
            />
          )} 
        </div>
      )}
  
        
    </div>
  );
}

export default DTHealthProByDay;