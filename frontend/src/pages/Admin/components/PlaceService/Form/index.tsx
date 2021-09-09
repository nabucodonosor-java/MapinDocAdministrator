import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "core/utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import InputMask from "react-input-mask";
import "./styles.scss";

import axios from "axios";

export type FormState = {
  id: number;
  name: string;
  phone: string;
  cellPhone: string;
  complemento: string;
};

type ParamsType = {
  placeId: string;
};

const BASE_URL = "https://viacep.com.br/ws";

type Address = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
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
        setValue("logradouro", response.data.logradouro);
        setValue("complemento", response.data.complemento);
        setValue("bairro", response.data.bairro);
        setValue("localidade", response.data.localidade);
        setValue("uf", response.data.uf);
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
          <h6>Nome do Local</h6>

          <input
            ref={register({ required: "Campo obrigatório" })}
            name="name"
            type="text"
            className="form-control input-base mb-2"
            placeholder="Nome do local"
          />
          {errors.name && (
            <div className="invalid-feedback d-block">
              {errors.name.message}
            </div>
          )}

          <div className="place-form-double-field mb-2">

          <Controller
            as={InputMask}
            name="phone"
            rules={{ required: false }}
            control={control}
            mask="(99) 9999-9999"
            id="phone"
            className="form-control input-base mr-1"
            defaultValue=""
            placeholder="Telefone"
          />

          <Controller
            as={InputMask}
            name="cellPhone"
            rules={{ required: false }}
            control={control}
            mask="(99) 99999-9999"
            id="cellPhone"
            className="form-control input-base"
            defaultValue=""
            placeholder="Celular"
          />

          </div>
          <div className="place-form-double-field card-base border-radius-10 mb-2 p-1">
          <span className="cep-title">Digite o CEP: </span>
          <input
            ref={register({ required: false })}
            name="searchValue"
            type="text"
            className="form-control input-base mr-2"
            placeholder="Informe o CEP"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            id="searchValue"
          />        
          </div>

          <input
            ref={register({ required: false })}
            name="cep"
            type="text"
            className="form-control input-base input-cep mr-2"
            placeholder="CEP"
            value={searchValue}
            id="cep"
          />
          <div className="place-form-double-field">
          <input
            ref={register({ required: false })}
            name="logradouro"
            type="text"
            className="form-control input-base mr-2"
            placeholder="Logradouro"
            value={addressData?.logradouro}
            id="logradouro"
          />

          <input
            ref={register({ required: "Campo obrigatório" })}
            name="complemento"
            type="text"
            className="form-control input-base mb-2"
            placeholder="Complemento"
          />
          {errors.complemento && (
            <div className="invalid-feedback d-block">
              {errors.complemento.message}
            </div>
          )}
          </div>
          <input
            ref={register({ required: false })}
            name="bairro"
            type="text"
            className="form-control input-base mr-2"
            placeholder="Bairro"
            value={addressData?.bairro}
            id="district"
          />

          <input
            ref={register({ required: false })}
            name="localidade"
            type="text"
            className="form-control input-base"
            placeholder="Cidade"
            value={addressData?.localidade}
            id="city"
          />

          <input
            ref={register({ required: false })}
            name="uf"
            type="text"
            className="form-control input-base"
            placeholder="Uf"
            value={addressData?.uf}
            id="state"
          />
        </>
      </BaseForm>
    </form>
  );
};
export default Form;
