import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "core/utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import Select from "react-select";
import { Doctor } from "core/types/doctor";
import "./styles.scss";

export type FormState = {
  id: number;
  visitDate: string;
  doctor: Doctor;
  success: boolean;
  description: string;
};

type ParamsType = {
  visitId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } =
    useForm<FormState>();
  const history = useHistory();
  const { visitId } = useParams<ParamsType>();
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const isEditing = visitId !== "create";
  const formTitle = isEditing ? "Editar Visita" : "Cadastrar Visita";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/visits/${visitId}` }).then((response) => {
        setValue("visitDate", response.data.visitDate);
        setValue("doctor", response.data.doctor);
        setValue("success", response.data.success);
        setValue("description", response.data.description);
      });
    }
  }, [visitId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingDoctor(true);
    makePrivateRequest({ url: "/doctors" })
      .then((response) => setDoctors(response.data.content))
      .finally(() => setIsLoadingDoctor(false));
  }, []);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };

    makePrivateRequest({
      url: isEditing ? `/visits/${visitId}` : "/visits",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Visita salva com sucesso!");
        history.push("/admin/visits");
      })
      .catch(() => {
        toast.error("Erro ao salvar visita!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="doctor-form-container">
          <div className="doctor-form-double-field">
            <input
              ref={register({ required: false })}
              name="visitDate"
              type="date"
              className="form-control input-base small-input"
              placeholder="Data da visita"
            />

            <input
              ref={register({ required: false })}
              name="success"
              type="checkbox"
            />
          </div>

          <Controller
            as={Select}
            name="doctor"
            rules={{ required: true }}
            control={control}
            isLoading={isLoadingDoctor}
            options={doctors}
            getOptionLabel={(option: Doctor) => option.name}
            getOptionValue={(option: Doctor) => String(option.id)}
            classNamePrefix="combo-base-select"
            className="input-select"
            placeholder="Médico(a)"
            inputId="doctor"
            defaultValue=""
          />

          {errors.doctor && (
            <div className="invalid-feedback d-block">Campo obrigatório!</div>
          )}

          <textarea
            ref={register({ required: false})}
            name="description"
            className="form-control input-base"
            placeholder="Descrição da Visita"
            cols={30} 
            rows={10}    
          />
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;
