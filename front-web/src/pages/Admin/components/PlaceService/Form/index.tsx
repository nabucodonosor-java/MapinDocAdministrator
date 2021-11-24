import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import InputMask from "react-input-mask";

import axios from "axios";

export type FormState = {
  id: number;
  name: string;
  phone: string;
  cellPhone: string;
  complemento: string;
  clinic: boolean;
  hospital: boolean;
  medicalCenter: boolean;
  cir: boolean;
  cityHall: boolean;
  apae: boolean;
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
        setValue("phone", response.data.phone);
        setValue("cellPhone", response.data.cellPhone);
        setValue("searchValue", searchValue);
        setValue("cep", response.data.cep);
        setValue("logradouro", response.data.logradouro);
        setValue("complemento", response.data.complemento);
        setValue("bairro", response.data.bairro);
        setValue("localidade", response.data.localidade);
        setValue("uf", response.data.uf);
        setValue("clinic", response.data.clinic);
        setValue("hospital", response.data.hospital);
        setValue("medicalCenter", response.data.medicalCenter);
        setValue("cir", response.data.cir);
        setValue("cityHall", response.data.cityHall);
        setValue("apae", response.data.apae);
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
        <div className="p-2">
        <table className="table base-card border-radius-10 text-center">
                <tr>
                  <th>Clínica</th>
                  <th>Hospital</th>
                </tr>
                <tr>
                  <td>
                  <input
                    ref={register({ required: false })}
                    name="clinic"
                    type="checkbox"
                    className=""
                  />
                  </td>
                  <td>
                    <input
                    ref={register({ required: false })}
                    name="hospital"
                    type="checkbox"
                    className=""
                    />
                  </td>
                </tr>

                <br/>

                <tr>
                  <th>Centro Médico</th>
                  <th>CIR</th>
                </tr>
                <tr>
                  <td>
                  <input
                    ref={register({ required: false })}
                    name="medicalCenter"
                    type="checkbox"
                    className=""
                  />
                  </td>
                  <td>
                    <input
                    ref={register({ required: false })}
                    name="cir"
                    type="checkbox"
                    className=""
                    />
                  </td>
                </tr>

                <br/>

                <tr>
                  <th>Unidade Pública</th>
                  <th>Apae</th>
                </tr>
                <tr>
                  <td>
                  <input
                    ref={register({ required: false })}
                    name="cityHall"
                    type="checkbox"
                    className=""
                  />
                  </td>
                  <td>
                    <input
                    ref={register({ required: false })}
                    name="apae"
                    type="checkbox"
                    className=""
                    />
                  </td>
                </tr>
          </table>
          <input
            ref={register({ required: "Campo obrigatório" })}
            name="name"
            type="text"
            className="form-control base-input mb-2"
            placeholder="Nome do local"
          />
          {errors.name && (
            <div className="invalid-feedback d-block"> 
              {errors.name.message}
            </div>
          )}

          <div className="mix-form-two-input">

          <Controller
            as={InputMask}
            name="phone"
            rules={{ required: false }}
            control={control}
            mask="(99) 9999-9999"
            id="phone"
            className="form-control base-input phone-input mb-2 mr-2"
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
            className="form-control base-input phone-input mb-2"
            defaultValue=""
            placeholder="Celular"
          />

          </div>
          <div className="base-card border-radius-10 p-1">
          <span className="cep-title"><strong>Digite o CEP: </strong></span>
          <input
            ref={register({ required: false })}
            name="searchValue"
            type="text"
            className="form-control"
            placeholder="Informe o CEP"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            id="searchValue"
          />        
          </div>
          <div className="mix-form-two-input">
            <input
              ref={register({ required: false })}
              name="cep"
              type="text"
              className="form-control base-input mb-2"
              placeholder="CEP"
              value={searchValue}
              id="cep"
            />
            
            <input
              ref={register({ required: false })}
              name="logradouro"
              type="text"
              className="form-control base-input mb-2 large-input"
              placeholder="Logradouro"
              value={addressData?.logradouro}
              id="logradouro"
            />

            <input
              ref={register({ required: "Campo obrigatório" })}
              name="complemento"
              type="text"
              className="form-control base-input mb-2 small-input"
              placeholder="Complemento"
            />
            {errors.complemento && (
              <div className="invalid-feedback d-block">
                {errors.complemento.message}
              </div>
            )}
          </div>
          <div className="mix-form-two-input">
          <input
            ref={register({ required: false })}
            name="bairro"
            type="text"
            className="form-control base-input mb-2"
            placeholder="Bairro"
            value={addressData?.bairro}
            id="bairro"
          />

          <input
            ref={register({ required: false })}
            name="localidade"
            type="text"
            className="form-control base-input mb-2 cidade-input"
            placeholder="Cidade"
            value={addressData?.localidade}
            id="localidade"
          />

          <input
            ref={register({ required: false })}
            name="uf"
            type="text"
            className="form-control base-input mb-2 uf-input"
            placeholder="UF"
            value={addressData?.uf}
            id="uf"
          />
          </div>
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;