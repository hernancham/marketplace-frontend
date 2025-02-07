import { Redirect } from "wouter";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../libs/axiosInstance";
import { navigate } from "wouter/use-hash-location";
import { useState } from "react";

const updateSchema = Yup.object({
  role: Yup.string().required("Es requerido"),
  phone: Yup.string()
    .length(9, "Debe tener 10 dígitos")
    .matches(/^(9)[0-9]+$/, "Debe ser un número valido")
    .required("Es requerido"),
});

export default function Profile() {
  const { session, logout } = useAuth();
  const [respuesta, setRespuesta] = useState<string>("");
  const [ok, setOk] = useState<boolean>(false);

  if (!session) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <h1 className="text-5xl font-bold">Tu perfil</h1>
          <p className="py-6">
            Esta es la página de tu perfil. Aquí puedes ver tu información
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold">Nombre</h2>
              <p>{session.user.name}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Email</h2>
              <p>{session.user.email}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Role</h2>
              <p>{session.user.role}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Phone</h2>
              <p>{session.user.phone}</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <Formik
                initialValues={{
                  role: session.user.role,
                  phone: session.user.phone,
                }}
                validationSchema={updateSchema}
                onSubmit={async (values) => {
                  const res = await api.put("/users/profile", values);
                  if (res.status === 200) {
                    setOk(true);
                    setRespuesta("Perfil actualizado correctamente");
                    // tiempo de espera
                    setTimeout(() => {
                      setRespuesta("");
                    }, 3000);
                    logout();
                    navigate("/login");
                  } else {
                    setOk(false);
                    setRespuesta("Error al actualizar el perfil");
                  }
                }}
              >
                <Form className="fieldset">
                  <label className="fieldset-label">Comprador</label>
                  <Field
                    type="radio"
                    name="role"
                    value="comprador"
                    className="radio"
                  />
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-400"
                  />
                  <label className="fieldset-label">Vendedor</label>
                  <Field
                    type="radio"
                    name="role"
                    value="vendedor"
                    className="radio"
                  />
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-400"
                  />
                  <label className="fieldset-label">Telefono</label>
                  <Field type="text" name="phone" className="input" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-400"
                  />
                  <button type="submit" className="btn btn-primary mt-4">
                    Actualizar
                  </button>
                  {respuesta && (
                    <p className={ok ? "text-green-500" : "text-red-500"}>
                      {respuesta}
                    </p>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
