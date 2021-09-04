import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "core/utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import Select from "react-select";
import ImageUpload from "../ImageUpload";
import InputMask from "react-input-mask";
import { Specialization } from "core/types/specialization";
import { Specialty } from "core/types/specialty";
import { PlaceService } from "core/types/placeService";
import "./styles.scss";

export type FormState = {
  id: number;
  imgUrl: string;
  crm: string;
  name: string;
  cardName: string;
  phone: string;
  email: string;
  birthDate: string;
  resume: string;
  seg: boolean;
  ter: boolean;
  qua: boolean;
  qui: boolean;
  sex: boolean;
  officeHours: string;
  specializations: Specialization[];
  specialty: Specialty;
  placeService: PlaceService;
};

type ParamsType = {
  doctorId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } =
    useForm<FormState>();
  const history = useHistory();
  const { doctorId } = useParams<ParamsType>();
  const [isLoadingSpecializations, setIsLoadingSpecializations] =
    useState(false);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoadingPlaceServices, setIsLoadingPlaceServices] = useState(false);
  const [placeServices, setPlaceServices] = useState<PlaceService[]>([]);

  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [doctorImgUrl, setDoctorImgUrl] = useState("");
  const isEditing = doctorId !== "create";
  const formTitle = isEditing ? "Editar Médico" : "Cadastrar Médico";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/doctors/${doctorId}` }).then((response) => {
        setValue("crm", response.data.crm);
        setValue("name", response.data.name);
        setValue("cardName", response.data.cardName);
        setValue("phone", response.data.phone);
        setValue("email", response.data.email);
        setValue("birthDate", response.data.birthDate);
        setValue("resume", response.data.resume);
        setValue("seg", response.data.seg);
        setValue("ter", response.data.ter);
        setValue("qua", response.data.qua);
        setValue("qui", response.data.qui);
        setValue("sex", response.data.sex);
        setValue("officeHours", response.data.officeHours);

        setValue("specializations", response.data.specializations);
        setValue("specialty", response.data.specialty);
        setValue("placeService", response.data.placeService);

        setDoctorImgUrl(response.data.imgUrl);
      });
    }
  }, [doctorId, isEditing]);

  useEffect(() => {
    setIsLoadingSpecializations(true);
    makePrivateRequest({ url: "/specializations" })
      .then((response) => setSpecializations(response.data.content))
      .finally(() => setIsLoadingSpecializations(false));
  }, []);

  useEffect(() => {
    setIsLoadingSpecialties(true);
    makePrivateRequest({ url: "/specialties" })
      .then((response) => setSpecialties(response.data.content))
      .finally(() => setIsLoadingSpecialties(false));
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
      imgUrl: uploadedImgUrl || doctorImgUrl,
    };
    makePrivateRequest({
      url: isEditing ? `/doctors/${doctorId}` : "/doctors",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Médico salvo com sucesso!");
        history.push("/admin/doctors");
      })
      .catch(() => {
        toast.error("Erro ao salvar médico!");
      });
  };

  const onUploadSuccess = (imgUrl: string) => {
    setUploadedImgUrl(imgUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <Controller
                as={Select}
                name="specialty"
                rules={{ required: true }}
                control={control}
                isLoading={isLoadingSpecialties}
                options={specialties}
                getOptionLabel={(option: Specialty) => option.name}
                getOptionValue={(option: Specialty) => String(option.id)}
                classNamePrefix="especializacoes-select"
                className="input-select"
                placeholder="Especialidade Médica"
                inputId="specialty"
                defaultValue=""
              />
              {errors.specialty && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório!
                </div>
              )}
            </div>

            <div className="margin-bottom-30 d-flex">
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
                placeholder="Nome do médico"
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="margin-bottom-30 d-flex">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="email"
                type="email"
                className="form-control input-base mr-2"
                placeholder="Email do médico"
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
                className="form-control input-base input-celular"
                defaultValue=""
                placeholder="Celular"
              />
            </div>

            <div className="margin-bottom-30">
              <Controller
                as={Select}
                name="specializations"
                rules={{ required: true }}
                control={control}
                isLoading={isLoadingSpecializations}
                options={specializations}
                getOptionLabel={(option: Specialization) => option.name}
                getOptionValue={(option: Specialization) => String(option.id)}
                classNamePrefix="especializacoes-select"
                placeholder="Especializações médicas"
                inputId="specializations"
                defaultValue=""
                isMulti
              />
              {errors.specializations && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório!
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <ImageUpload
                onUploadSuccess={onUploadSuccess}
                doctorImgUrl={doctorImgUrl}
              />
            </div>
          </div>

          <h6>Horários de Atendimento</h6>
          <textarea
            ref={register({ required: false })}
            name="officeHours"
            className="form-control input-base mb-3 mt-2"
            placeholder="Horário de Atendimento"
            cols={30}
            rows={10}
          />
          <Controller
                as={Select}
                name="placeService"
                rules={{ required: true }}
                control={control}
                isLoading={isLoadingPlaceServices}
                options={placeServices}
                getOptionLabel={(option: PlaceService) => option.name}
                getOptionValue={(option: PlaceService) => String(option.id)}
                classNamePrefix="especializacoes-select"
                className="input-select"
                placeholder="Local de Atendimento"
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
