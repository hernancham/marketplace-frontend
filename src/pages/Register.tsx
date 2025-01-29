/* import { navigate } from "wouter/use-browser-location"; */
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(4, "Es muy corto!")
    .max(50, "Es muy largo!")
    .required("Es requerido"),
  email: Yup.string().email("Email invalido").required("Es requerido"),
  password: Yup.string()
    .min(8, "Es muy corto!")
    .max(50, "Es muy largo!")
    .required("Es requerido"),
});

interface respose {
  name: string;
  email: string;
}

export default function Register() {
  const [respuesta, setRespuesta] = useState<string>("");

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register</h1>
          <p className="py-6">
            Esta es la página de registro. Aquí puedes registrarte para acceder
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={registerSchema}
              onSubmit={async (values) => {
                const res = await axios.post<respose>(
                  "https://marketplace-backend-icya.onrender.com/api/v1/auth/register",
                  {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                  }
                );

                if (res.status === 201) {
                  setRespuesta("Usuario registrado correctamente");
                } else {
                  setRespuesta("Error al registrar usuario");
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="fieldset">
                  <Field name="name" className="input" />
                  {touched.name && errors.name && (
                    <div className="text-red-400">{errors.name}</div>
                  )}
                  <Field name="email" className="input" />
                  {touched.email && errors.email && (
                    <div className="text-red-400">{errors.email}</div>
                  )}
                  <Field name="password" className="input" />
                  {touched.password && errors.password && (
                    <div className="text-red-400">{errors.password}</div>
                  )}
                  <button type="submit" className="btn btn-neutral mt-4">
                    Registrar
                  </button>
                  {respuesta && (
                    <div className="text-green-400">{respuesta}</div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
