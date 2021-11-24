import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import Select from "react-select";
import { HealthProfessional } from "types/healthProfessional";
import "./styles.scss";
import { Product } from "types/product";

export type FormState = {
    id: number;
    prescriptionDate: string;
    healthPro: HealthProfessional;
    product: Product;
    qtde: number; 
};

type ParamsType = {
  prescriptionId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } =
    useForm<FormState>();
  const history = useHistory();
  const { prescriptionId } = useParams<ParamsType>();
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);
  const [healthPros, setHealthPros] = useState<HealthProfessional[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const isEditing = prescriptionId !== "create";
  const formTitle = isEditing ? "Editar Receita" : "Cadastrar Receita";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/prescriptions/${prescriptionId}` }).then((response) => {
        setValue("prescriptionDate", response.data.prescriptionDate);
        setValue("healthPro", response.data.healthPro);
        setValue("product", response.data.product);
        setValue("qtde", response.data.qtde);
      });
    }
  }, [prescriptionId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingDoctor(true);
    makePrivateRequest({ url: "/hp" })
      .then((response) => setHealthPros(response.data.content))
      .finally(() => setIsLoadingDoctor(false));
  }, []);

  useEffect(() => {
    setIsLoadingProduct(true);
    makePrivateRequest({ url: "/products" })
      .then((response) => setProducts(response.data.content))
      .finally(() => setIsLoadingProduct(false));
  }, []);

  const onSubmit = (data: FormState) => {
    const payload = {
      ...data,
    };

    makePrivateRequest({
      url: isEditing ? `/prescriptions/${prescriptionId}` : "/prescriptions",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Receita salva com sucesso!");
        history.push("/admin/prescriptions");
      })
      .catch(() => {
        toast.error("Erro ao salvar receita!");
      });
  }; 

  return ( 
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="prescription-form-container">
          <div className="prescription-form-inputs">
            <input
              ref={register({ required: false })}
              name="prescriptionDate"
              type="date"
              className="form-control input-base mr-1"
              placeholder="Data da receita"
            />
           <input
              ref={register({ required: false })}
              name="qtde"
              type="number"
              className="form-control input-base"
              placeholder="Qtde de Produtos"
            />
          </div>

          <Controller
            as={Select}
            name="healthPro"
            rules={{ required: true }}
            control={control}
            isLoading={isLoadingDoctor}
            options={healthPros}
            getOptionLabel={(option: HealthProfessional) => option.name}
            getOptionValue={(option: HealthProfessional) => String(option.id)}
            classNamePrefix="combo-base-select"
            className="input-select"
            placeholder="Profissional"
            inputId="healthPro"
            defaultValue=""
          />

          {errors.healthPro && (
            <div className="invalid-feedback d-block">Campo obrigatório!</div>
          )}

          <Controller
            as={Select}
            name="product"
            rules={{ required: true }}
            control={control}
            isLoading={isLoadingProduct}
            options={products}
            getOptionLabel={(option: Product) => option.name}
            getOptionValue={(option: Product) => String(option.id)}
            classNamePrefix="combo-base-select"
            className="input-select"
            placeholder="Produto"
            inputId="product"
            defaultValue=""
          />

          {errors.product && (
            <div className="invalid-feedback d-block">Campo obrigatório!</div>
          )}
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;