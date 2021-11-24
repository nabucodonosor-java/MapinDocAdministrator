import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import Select from "react-select";
import { PlaceService } from "types/placeService";
import "./styles.scss";

export type FormState = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  placeService: PlaceService;
};

type ParamsType = {
  secretaryId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
  const history = useHistory();
  const { secretaryId } = useParams<ParamsType>();
  const [isLoadingPlaceServices, setIsLoadingPlaceServices] = useState(false);
  const [placeServices, setPlaceServices] = useState<PlaceService[]>([]);
  const isEditing = secretaryId !== "create";
  const formTitle = isEditing ? "Editar Secretária" : "Cadastrar Secretária";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/secretaries/${secretaryId}` }).then((response) => {
        setValue("name", response.data.name);
        setValue("birthDate", response.data.birthDate);
        setValue("description", response.data.description);
        setValue("placeService", response.data.placeService);        
      }); 
    }
    window.scrollTo(0, 0);
  }, [secretaryId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingPlaceServices(true);
    makePrivateRequest({ url: "/places" })
      .then((response) => setPlaceServices(response.data.content))
      .finally(() => setIsLoadingPlaceServices(false));
  }, []);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };

    makePrivateRequest({
      url: isEditing ? `/secretaries/${secretaryId}` : "/secretaries",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Secretária salva com sucesso!");
        history.push("/admin/secretaries");
      })
      .catch(() => {
        toast.error("Erro ao salvar secretária!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="secretary-form-container">
            <div className="mix-form-two-input">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="name"
                type="text"
                className="form-control base-input large-input"
                placeholder="Nome da secretária"
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}

              <input
                ref={register({ required: false })}
                name="birthDate"
                type="date"
                className="form-control base-input small-input"
              />
            </div>
     
              <h6>Observações</h6>
              <textarea
                ref={register({ required: false })}
                name="description"
                className="form-control base-input"
                placeholder="Observações..."
                cols={30}
                rows={10}
              />
    

      
              <h6>Local de Atendimento</h6>
              <Controller
                as={Select}
                name="placeService"
                rules={{ required: true }}
                control={control}
                isLoading={isLoadingPlaceServices}
                options={placeServices}
                getOptionLabel={(option: PlaceService) => option.name}
                getOptionValue={(option: PlaceService) => String(option.id)}
                classNamePrefix="combo-base-select"
                className=""
                placeholder="Local de visitação"
                inputId="placeService"
                defaultValue=""
              />
            
              {errors.placeService && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório!
                </div>
              )}

        </div>
      </BaseForm>
    </form>
  );
};
export default Form;

