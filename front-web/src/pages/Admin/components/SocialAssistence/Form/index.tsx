import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import Select from "react-select";
import InputMask from "react-input-mask";
import { Profession } from "types/profession";
import { PlaceService } from "types/placeService";
import "./styles.scss";

export type FormState = {
  id: number;
  name: string;
  cellPhone: string;
  email: string;
  description: string;
  profession: Profession;
  placeService: PlaceService;
};

type ParamsType = {
  socialId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
  const history = useHistory();
  const { socialId } = useParams<ParamsType>();
  const [isLoadingProfessions, setIsLoadingProfessions] = useState(false);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [isLoadingPlaceServices, setIsLoadingPlaceServices] = useState(false);
  const [placeServices, setPlaceServices] = useState<PlaceService[]>([]);
  const isEditing = socialId !== "create";
  const formTitle = isEditing ? "Editar Profissional" : "Cadastrar Profissional";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/social/${socialId}` }).then((response) => {
        setValue("name", response.data.name);
        setValue("cellPhone", response.data.cellPhone);
        setValue("email", response.data.email);
        setValue("description", response.data.description);
        setValue("profession", response.data.profession);
        setValue("placeService", response.data.placeService);        
      }); 
    }
    window.scrollTo(0, 0);
  }, [socialId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingProfessions(true);
    makePrivateRequest({ url: "/profession" })
      .then((response) => setProfessions(response.data.content))
      .finally(() => setIsLoadingProfessions(false));
  }, []);

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
      url: isEditing ? `/social/${socialId}` : "/social",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Profissional salvo com sucesso!");
        history.push("/admin/social");
      })
      .catch(() => {
        toast.error("Erro ao salvar profissional!");
      });
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div>
           
            <Controller
              as={Select}
              name="profession"
              rules={{ required: true }}
              control={control}
              isLoading={isLoadingProfessions}
              options={professions}
              getOptionLabel={(option: Profession) => option.name}
              getOptionValue={(option: Profession) => String(option.id)}
              classNamePrefix="combo-base-select"
              className=""
              placeholder="Profissional..."
              inputId="profession"
              defaultValue=""
            />
                
              {errors.profession && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório!
                </div>
              )}
            
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

              <input
                ref={register({ required: "Campo obrigatório" })}
                name="name"
                type="text"
                className="form-control base-input mb-2"
                placeholder="Nome do profissional"
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}  
          
            <div className="form-social-two-fields">
              <input
                  ref={register({ required: false })}
                  name="email"
                  type="email"
                  className="form-control base-input mr-2 mb-2"
                  placeholder="Email do profissional"
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email.message}
                  </div>
                )}
                  <Controller
                    as={InputMask}
                    name="phone"
                    rules={{ required: false }}
                    control={control}
                    mask="(99) 99999-9999"
                    id="phone"
                    className="form-control base-input small-input"
                    defaultValue=""
                    placeholder="Celular"
                />
            </div>
              <h6>Observações</h6>
              <textarea
                ref={register({ required: false })}
                name="description"
                className="form-control base-input"
                placeholder="Observações"
                cols={30}
                rows={5} 
              /> 
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;

