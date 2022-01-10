import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { makePrivateRequest } from "utils/request";
import { toast } from "react-toastify";
import BaseForm from "../../BaseForm";
import Select from "react-select";
import ImageUpload from "../ImageUpload";
import InputMask from "react-input-mask";
import { Specialization } from "types/specialization";
import { Profession } from "types/profession";
import { PlaceService } from "types/placeService";
import "./styles.scss";

export type FormState = {
  id: number;
  imgUrl: string;
  register: string;
  name: string;
  cardName: string;
  phone: string;
  email: string;
  birthDate: string;
  resume: string;
  byScheduling: boolean;
  seg: boolean;
  segPeriod: string;
  ter: boolean;
  terPeriod: string;
  qua: boolean;
  quaPeriod: string;
  qui: boolean;
  quiPeriod: string;
  sex: boolean;
  sexPeriod: string;
  sab: boolean;
  sabPeriod: string;
  officeHours: string;
  partner: boolean;
  strategic: boolean;
  potencial: boolean;
  schedulingDate: string;
  profession: Profession;
  placeService: PlaceService;
  specializations: Specialization[];
};

type ParamsType = {
  hpId: string;
};

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } =
    useForm<FormState>();
  const history = useHistory();
  const { hpId } = useParams<ParamsType>();
  const [isLoadingSpecializations, setIsLoadingSpecializations] =
    useState(false);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [isLoadingProfessions, setIsLoadingProfessions] = useState(false);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [isLoadingPlaceServices, setIsLoadingPlaceServices] = useState(false);
  const [placeServices, setPlaceServices] = useState<PlaceService[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [hpImgUrl, setHpImgUrl] = useState("");
  const isEditing = hpId !== "create";
  const formTitle = isEditing
    ? "Editar Profissional"
    : "Cadastrar Profissional";

  useEffect(() => {
    if (isEditing) {
      makePrivateRequest({ url: `/hp/${hpId}` }).then((response) => {
        setValue("register", response.data.register);
        setValue("register", response.data.register);
        setValue("name", response.data.name);
        setValue("cardName", response.data.cardName);
        setValue("phone", response.data.phone);
        setValue("email", response.data.email);
        setValue("birthDate", response.data.birthDate);
        setValue("resume", response.data.resume);
        setValue("byScheduling", response.data.byScheduling);
        setValue("seg", response.data.seg);
        setValue("segPeriod", response.data.segPeriod);
        setValue("ter", response.data.ter);
        setValue("terPeriod", response.data.terPeriod);
        setValue("qua", response.data.qua);
        setValue("quaPeriod", response.data.quaPeriod);
        setValue("qui", response.data.qui);
        setValue("quiPeriod", response.data.quiPeriod);
        setValue("sex", response.data.sex);
        setValue("sexPeriod", response.data.sexPeriod);
        setValue("sab", response.data.sab);
        setValue("sabPeriod", response.data.sabPeriod);
        setValue("officeHours", response.data.officeHours);
        setValue("partner", response.data.partner);
        setValue("strategic", response.data.strategic);
        setValue("potencial", response.data.potencial);
        setValue("schedulingDate", response.data.schedulingDate);
        setValue("specializations", response.data.specializations);
        setValue("profession", response.data.profession);
        setValue("placeService", response.data.placeService);
        setHpImgUrl(response.data.imgUrl);
      });
    }
    window.scrollTo(0, 0);
  }, [hpId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingSpecializations(true);
    makePrivateRequest({ url: "/specializations" })
      .then((response) => setSpecializations(response.data.content))
      .finally(() => setIsLoadingSpecializations(false));
  }, []);

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
      imgUrl: uploadedImgUrl || hpImgUrl,
    };
    makePrivateRequest({
      url: isEditing ? `/hp/${hpId}` : "/hp",
      method: isEditing ? "PUT" : "POST",
      data: payload,
    })
      .then(() => {
        toast.info("Profissional salvo com sucesso!");
        history.push("/admin/hp");
      })
      .catch(() => {
        toast.error("Erro ao salvar profissional!");
      });
  };

  const onUploadSuccess = (imgUrl: string) => {
    setUploadedImgUrl(imgUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="hp-form-container">
          <div className="hp-form-content">
            <div className="hp-form-hp-types">
              <table className="table hp-form-table">
                <tr>
                  <td>
                    <label>Profissional parceiro?</label>
                  </td>
                  <td className="hp-form-toggle-td">
                    <input
                      ref={register({ required: false })}
                      name="partner"
                      type="checkbox"
                      className="ml-4"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Profissional estratégico?</label>
                  </td>
                  <td className="hp-form-toggle-td">
                    <input
                      ref={register({ required: false })}
                      name="strategic"
                      type="checkbox"
                      className="ml-4"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Profissional potencial?</label>
                  </td>
                  <td className="hp-form-toggle-td">
                    <input
                      ref={register({ required: false })}
                      name="potencial"
                      type="checkbox"
                      className="ml-4"
                    />
                  </td>
                </tr>
              </table>
            </div>

            <div className="mix-form-two-input">
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
                className="large-input"
                placeholder="Profissional..."
                inputId="profession"
                defaultValue=""
              />

              {errors.profession && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório!
                </div>
              )}

              <input
                ref={register({ required: false })}
                name="register"
                type="text"
                className="form-control base-input small-input mb-2"
                placeholder="CRM / CREFITO"
              />
            </div>

            <div className="mix-form-two-input">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="name"
                type="text"
                className="form-control base-input large-input mb-2"
                placeholder="Nome do profissional"
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
                className="form-control base-input small-input mb-2"
              />
            </div>

            <div className="mix-form-two-input">
              <input
                ref={register({ required: false })}
                name="email"
                type="email"
                className="form-control base-input large-input mb-2"
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
                className="form-control base-input small-input mb-2"
                defaultValue=""
                placeholder="Celular"
              />
            </div>

            <Controller
              as={Select}
              name="specializations"
              rules={{ required: true }}
              control={control}
              isLoading={isLoadingSpecializations}
              options={specializations}
              getOptionLabel={(option: Specialization) => option.name}
              getOptionValue={(option: Specialization) => String(option.id)}
              classNamePrefix="combo-specializations-select"
              className=""
              placeholder="Especializações clínicas"
              inputId="specializations"
              defaultValue=""
              isMulti
            />
            {errors.specializations && (
              <div className="invalid-feedback d-block">Campo obrigatório!</div>
            )}

            {!isEditing ? (
              <div></div>
            ) : (
              <div className="doctor-img-container">
                <ImageUpload
                  onUploadSuccess={onUploadSuccess}
                  hpImgUrl={hpImgUrl}
                />
              </div>
            )}

            <h6 className="mt-2 text-center">Currículo & Observações</h6>
            <textarea
              ref={register({ required: false })}
              name="resume"
              className="form-control base-input"
              placeholder="Currículo e observações..."
              cols={30}
              rows={10}
            />
          </div>

          <div>
            <h6 className="mt-2 text-center p-2">Local de Atendimento</h6>
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
              <div className="invalid-feedback d-block">Campo obrigatório!</div>
            )}
            <h6 className="mt-2 text-center p-2">
              Dias e Períodos de Atendimento
            </h6>

            <table className="table hp-form-table">
              <tr>
                <th>Dia da Semana</th>
                <th>Atende?</th>
                <th>Período?</th>
              </tr>
              <tr>
                <td>
                  <label>Visita Agendada?</label>
                </td>
                <td className="toggle-td">
                  <input
                    ref={register({ required: false })}
                    name="byScheduling"
                    type="checkbox"
                  />
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="schedulingDate"
                    type="date"
                    className="base-input form-control scheduling-input"
                    placeholder="Data"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Segunda</label>
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="seg"
                    type="checkbox"
                  />
                </td>
                <td>
                  <select
                    className="base-input form-control"
                    ref={register({ required: false })}
                    name="segPeriod"
                  >
                    <option value="N/A">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Manhã/Tarde">Manhã/Tarde</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Terça</label>
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="ter"
                    type="checkbox"
                  />
                </td>
                <td>
                  <select
                    className="base-input form-control"
                    ref={register({ required: false })}
                    name="terPeriod"
                  >
                    <option value="N/A">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Manhã/Tarde">Manhã/Tarde</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Quarta</label>
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="qua"
                    type="checkbox"
                  />
                </td>

                <td>
                  <select
                    className="base-input form-control"
                    ref={register({ required: false })}
                    name="quaPeriod"
                  >
                    <option value="N/A">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Manhã/Tarde">Manhã/Tarde</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Quinta</label>
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="qui"
                    type="checkbox"
                  />
                </td>
                <td>
                  <select
                    className="base-input form-control"
                    ref={register({ required: false })}
                    name="quiPeriod"
                  >
                    <option value="N/A">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Manhã/Tarde">Manhã/Tarde</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Sexta</label>
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="sex"
                    type="checkbox"
                  />
                </td>
                <td>
                  <select
                    className="base-input form-control"
                    ref={register({ required: false })}
                    name="sexPeriod"
                  >
                    <option value="N/A">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Manhã/Tarde">Manhã/Tarde</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Sábado</label>
                </td>
                <td>
                  <input
                    ref={register({ required: false })}
                    name="sab"
                    type="checkbox"
                  />
                </td>
                <td>
                  <select
                    className="base-input form-control"
                    ref={register({ required: false })}
                    name="sabPeriod"
                  >
                    <option value="N/A">Escolha</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Manhã/Tarde">Manhã/Tarde</option>
                  </select>
                </td>
              </tr>
            </table>

            <h6 className="text-center">Horários de Atendimento</h6>
            <textarea
              ref={register({ required: false })}
              name="officeHours"
              className="form-control input-base"
              placeholder="Horário de Atendimento"
              cols={30}
              rows={10}
            />
          </div>
        </div>
      </BaseForm>
    </form>
  );
};
export default Form;
