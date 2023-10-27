import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../styles/log-sign-styles.css";
import axios from "axios";

//TODO al hacer signup ir a home
function Signup() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  let history = useNavigate();

  const switchToLogin = () => {
    history("/login");
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:5174/auth", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        history("/login");
      }
    });
  };
  //TODO Asegurar los parameros de contraseña y usuario para que no puedan enviar nulos u otras cosas por el estilo
  return (
    <>
      <div className="title-box">
        <div className="logo"></div>
        <h1 className="login-title">CineMaestro</h1>
      </div>
      <div className="login-box">
        <h2>Registrarse</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="user-box">
              <Field type="text" id="user" name="username" />
              <label>Usuario</label>
            </div>
            <div className="user-box">
              <Field type="password" id="password" name="password" />
              <label>Contraseña</label>
            </div>
            <div className="signup-signup">
              <button className="iniciar" type="submit">
                Aceptar
              </button>
              <button className="iniciar" onClick={switchToLogin}>
                Iniciar sesion
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Signup;
