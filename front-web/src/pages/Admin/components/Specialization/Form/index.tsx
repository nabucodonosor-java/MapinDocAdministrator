import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import "./styles.scss";

export type FormState = {
    id: number;
    name: string;
};

type ParamsType = {
  specializationId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue } =
    useForm<FormState>();
  const history = useHistory();
  const { specializationId } = useParams<ParamsType>();

  const isEditing = specializationId !== "create";
  const formTitle = isEditing ? "Editar Especialização" : "Cadastrar Especialização";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/specializations/${specializationId}` }).then((response) => {
        setValue("name", response.data.name);
      });
    }
  }, [specializationId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };

    makePrivateRequest({
      url: isEditing ? `/specializations/${specializationId}` : "/specializations",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Especialização salva com sucesso!");
        history.push("/admin/specializations");
      })
      .catch(() => {
        toast.error("Erro ao salvar especialização!");
      });
  }; 

  return ( 
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div>
          <div className="prescription-form-inputs">
            <input
              ref={register({ required: false })}
              name="name"
              type="text"
              className="form-control input-base"
              placeholder="Especialização"
            />
            {errors.name && (
            <div className="invalid-feedback d-block">Campo obrigatório!</div>
          )}
          </div>

         
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;