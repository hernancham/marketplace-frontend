import { navigate } from "wouter/use-browser-location";
import { useAuth } from "../context/AuthContext";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const loginSchema = Yup.object({
  email: Yup.string().email("Email invalido").required("Es requerido"),
  password: Yup.string()
    .min(8, "Es muy corto!")
    .max(50, "Es muy largo!")
    .required("Es requerido"),
});

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Este es el formulario de inicio de sesión. Ingrese sus credenciales
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={async (values) => {
                try {
                  await login(values.email, values.password);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="fieldset">
                  <label className="label">Email</label>
                  <Field name="email" className="input" />
                  {touched.email && errors.email && (
                    <div className="text-red-400">{errors.email}</div>
                  )}
                  <label className="label">Contraseña</label>
                  <Field name="password" className="input" />
                  {touched.password && errors.password && (
                    <div className="text-red-400">{errors.password}</div>
                  )}
                  <button type="submit" className="btn btn-neutral mt-4">
                    iniciar sesión
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
