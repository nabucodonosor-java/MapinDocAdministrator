import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import Pagination from "components/Pagination";
import { PlaceServiceResponse } from "types/placeService";
import PlaceServiceFilters from "components/Filters/PlaceServiceFilters";
import BasicLoader from "components/Loaders/BasicLoader";
import Card from "../Card";
import "./styles.scss";


const List = () => {
  const [placeResponse, setPlaceResponse] = useState<PlaceServiceResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
  const [name, setName] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [localidade, setLocalidade] = useState("");

  const getPlaces = useCallback(() => {
    const params = {
      page: activePage,
      size: 10,
      direction: "DESC",
      sort: "id",
      name,
      logradouro,
      localidade
    };
    setIsLoading(true);
    makePrivateRequest({ url: "/places", params })
      .then((response) => setPlaceResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, name, logradouro, localidade]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  };

  const handleChangeLogradouro = (logradouro: string) => {
    setActivePage(0);
    setLogradouro(logradouro);
  };

  const handleChangeLocalidade = (localidade: string) => {
    setActivePage(0);
    setLocalidade(localidade);
  };

  const clearFilters = () => {
    setActivePage(0);
    setName("");
    setLogradouro("");
    setLocalidade("");
  };

  const handleCreate = () => {
    history.push("/admin/places/create");
  };

  const onRemove = (placeId: number) => {
    const confirm = window.confirm("Deseja realmente excluir este local?");

    if (confirm) {
      makePrivateRequest({ url: `/places/${placeId}`, method: "DELETE" })
        .then(() => {
          toast.info("Local deletado com sucesso!");
          getPlaces();
        })
        .catch(() => {
          toast.error("Erro ao deletar local");
        });
    }
  };

  return (
    <div className="admin-place-list-container">
      <div className="admin-place-filters-container"> 
        
        <PlaceServiceFilters
          name={name}
          handleChangeName={handleChangeName}
          localidade={localidade}
          handleChangeLocalidade={handleChangeLocalidade}
          logradouro={logradouro}
          handleChangeLogradouro={handleChangeLogradouro}
          clearFilters={clearFilters}
        />
        <button
          className="btn btn-primary btn-lg admin-place-btn-add mb-1 mt-1"
          onClick={handleCreate}
        >
          ADICIONAR
        </button>
      </div>

      <div className="admin-place-content-container mb-5">
        {isLoading ? (
          <BasicLoader />
        ) : (
          placeResponse?.content.map((place) => (
            <Card place={place} key={place.id} onRemove={onRemove} />
          ))
        )}
        {placeResponse && (
          <Pagination
            totalPages={placeResponse.totalPages}
            onChange={(page) => setActivePage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default List;