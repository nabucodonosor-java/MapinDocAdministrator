import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "core/utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import "./styles.scss";

import axios from "axios";

export type FormState = {
  id: number;
  name: string;
};

type ParamsType = {
  placeId: string;
};

const BASE_URL = "https://viacep.com.br/ws";

type Address = {
  street: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } =
    useForm<FormState>();
  const history = useHistory();
  const { placeId } = useParams<ParamsType>();

  const isEditing = placeId !== "create";
  const formTitle = isEditing ? "Editar Local" : "Cadastrar Local";

  const [searchValue, setSearchValue] = useState("");
  const [addressData, setAddressData] = useState<Address>();

  const handleSubmitCep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddressData(undefined);

    axios(`${BASE_URL}/${searchValue}/json`)
      .then((response) => setAddressData(response.data))
      .catch(() => console.error("ERRO!"));
  };

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/places/${placeId}` }).then((response) => {
        setValue("name", response.data.name);
        setValue("searchValue", searchValue);
        setValue("cep", response.data.cep);
        setValue("street", response.data.street);
        setValue("complement", response.data.complement);
        setValue("district", response.data.district);
        setValue("city", response.data.city);
        setValue("state", response.data.state);
      });
    }
  }, [placeId, isEditing, setValue, searchValue]);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };
    makePrivateRequest({
      url: isEditing ? `/places/${placeId}` : "/places",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Local salvo com sucesso!");
        history.push("/admin/places");
      })
      .catch(() => {
        toast.error("Erro ao salvar local!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmitCep}>
      <BaseForm title={formTitle}>
        <>
          <input
            ref={register({ required: false })}
            name="crm"
            type="text"
            className="form-control input-base input-crm"
            placeholder="CRM do médico"
          />

          <input
            ref={register({ required: "Campo obrigatório" })}
            name="name"
            type="text"
            className="form-control input-base"
            placeholder="Nome do local"
          />
          {errors.name && (
            <div className="invalid-feedback d-block">
              {errors.name.message}
            </div>
          )}

          <h6>Informações sobre Local de Visita</h6>

          <span className="">Busca CEP: </span>
          <input
            ref={register({ required: false })}
            name="searchValue"
            type="text"
            className="form-control input-base input-busca-cep mr-2"
            placeholder="Informe o CEP"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            id="searchValue"
          />

          <input
            ref={register({ required: false })}
            name="cep"
            type="text"
            className="form-control input-base input-cep mr-2"
            placeholder="CEP"
            value={searchValue}
            id="cep"
          />

          <input
            ref={register({ required: false })}
            name="street"
            type="text"
            className="form-control input-base mr-2"
            placeholder="Logradouro"
            value={addressData?.street}
            id="street"
          />

          <input
            ref={register({ required: false })}
            name="complement"
            type="text"
            className="form-control input-base mr-2"
            placeholder="Bairro"
            value={addressData?.complement}
            id="complement"
          />

          <input
            ref={register({ required: false })}
            name="district"
            type="text"
            className="form-control input-base mr-2"
            placeholder="Bairro"
            value={addressData?.district}
            id="district"
          />

          <input
            ref={register({ required: false })}
            name="city"
            type="text"
            className="form-control input-base"
            placeholder="Cidade"
            value={addressData?.city}
            id="city"
          />

          <input
            ref={register({ required: false })}
            name="state"
            type="text"
            className="form-control input-base"
            placeholder="Uf"
            value={addressData?.state}
            id="state"
          />
        </>
      </BaseForm>
    </form>
  );
};
export default Form;
