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
  professionId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue } =
    useForm<FormState>();
  const history = useHistory();
  const { professionId } = useParams<ParamsType>();

  const isEditing = professionId !== "create";
  const formTitle = isEditing ? "Editar Profissão" : "Cadastrar Profissão";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/profession/${professionId}` }).then((response) => {
        setValue("name", response.data.name);
      });
    }
  }, [professionId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };

    makePrivateRequest({
      url: isEditing ? `/profession/${professionId}` : "/profession",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Profissão salva com sucesso!");
        history.push("/admin/professions");
      })
      .catch(() => {
        toast.error("Erro ao salvar profissão!");
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
              placeholder="Profissão"
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