import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makePrivateRequest } from "core/utils/request";
import { toast } from "react-toastify";
import Pagination from "core/components/Pagination";
import { PlaceServiceResponse } from "core/types/placeService";
import PlaceServiceFilters from "core/components/Filters/PlaceServiceFilters";
import HomeLoader from "pages/Home/components/HomeLoader";
import "./styles.scss";
import Card from "../Card";

const List = () => {
  const [placeResponse, setPlaceResponse] = useState<PlaceServiceResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
  const [name, setName] = useState("");

  const getPlaces = useCallback(() => {
    const params = {
      page: activePage,
      size: 20,
      direction: "DESC",
      sort: "id",
      name,
    };
    setIsLoading(true);
    makePrivateRequest({ url: "/places", params })
      .then((response) => setPlaceResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, name]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  };

  const clearFilters = () => {
    setActivePage(0);
    setName("");
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
    <div className="admin-doc-list-container">
      <div className="admin-filters-container"> 
        <button
          className="btn btn-primary btn-lg admin-btn-add mb-1"
          onClick={handleCreate}
        >
          ADICIONAR
        </button>
        <PlaceServiceFilters
          name={name}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
        />
      </div>

      <div className="admin-content-container">
        {isLoading ? (
          <HomeLoader />
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
