import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import ButtonIcon from "src/components/ButttonIcon";
import { saveSessionData } from "src/utils/auth";
import { makeLogin } from "src/utils/requests";
import AuthCard from "../AuthCard";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = (data: FormData) => {
    makeLogin(data)
      .then((response) => {
        setHasError(false);
        saveSessionData(response.data);
        history.replace(from);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  return (
    <AuthCard title="login">
      {hasError && (
        <div className="alert alert-danger mt-5">
          Usuário ou senha inválido(s)!
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <input
            type="email"
            className={`form-control base-input ${
              errors.username ? "is-invalid" : ""
            }`}
            placeholder="Email"
            name="username"
            ref={register({
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.username && (
            <div className="invalid-feedback d-block">
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="">
          <input
            type="password"
            className={`form-control base-input ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="Senha"
            name="password"
            ref={register({ required: "Campo obrigatório" })}
          />
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="login-submit">
          <ButtonIcon
            text="logar"
            img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-trade.png"
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default Login;
