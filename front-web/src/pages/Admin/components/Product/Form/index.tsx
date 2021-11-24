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
    weight: number;
};

type ParamsType = {
  productId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue } =
    useForm<FormState>();
  const history = useHistory();
  const { productId } = useParams<ParamsType>();

  const isEditing = productId !== "create";
  const formTitle = isEditing ? "Editar Produto" : "Cadastrar Produto";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/products/${productId}` }).then((response) => {
        setValue("name", response.data.name);
        setValue("weight", response.data.weight);
      });
    }
  }, [productId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };

    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : "/products",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Produto salvo com sucesso!");
        history.push("/admin/products");
      })
      .catch(() => {
        toast.error("Erro ao salvar produto!");
      });
  }; 

  return ( 
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div>
          <div>
            <input
              ref={register({ required: false })}
              name="name"
              type="text"
              className="form-control input-base"
              placeholder="nome do produto"
            />
            {errors.name && (
            <div className="invalid-feedback d-block">Campo obrigatório!</div>
          )}

          <select
            className="base-input form-control"
            ref={register({ required: false })}
            name="weight">
                <option value="0">Selecione o tipo ...</option>
                <option value="1">Loja</option>
                <option value="3">Órtese</option>
                <option value="5">Prótese</option>
          </select>
          </div>
  
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;