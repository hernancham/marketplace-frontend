import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../libs/axiosInstance";
import { Redirect } from "wouter";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(4, "Es muy corto!")
    .max(50, "Es muy largo!")
    .required("Es requerido"),
  description: Yup.string().required("Es requerido"),
  category: Yup.string().required("Es requerido"),
  price: Yup.number().required("Es requerido"),
  stock: Yup.number().required("Es requerido"),
  image: Yup.mixed().required("Es requerido"),
});

export default function Vender() {
  const { session } = useAuth();
  const [respuesta, setRespuesta] = useState<string>("");
  const [ok, setOk] = useState<boolean>(false);

  if (!session) {
    return <Redirect to="/login" />;
  }

  if (session?.user.role === "comprador") {
    return <Redirect to="/" />;
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sebir un producto</h1>
          <p className="py-6">
            Esta es la página para vender un producto. Aquí puedes vender un
            producto para acceder
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <Formik
              initialValues={{
                name: "",
                description: "",
                category: "",
                price: 0,
                stock: 1,
                image: null,
              }}
              validationSchema={registerSchema}
              onSubmit={async (values) => {
                console.log(values);
                const response = await api.postForm("/images/upload", {
                  file: values.image,
                });
                console.log(response.data);
                const res = await api.post("/products", {
                  name: values.name,
                  description: values.description,
                  category: values.category,
                  price: values.price,
                  stock: values.stock,
                  imageUrl: response.data.imageUrl,
                });
                console.log(res);
                if (res.status === 201) {
                  setOk(true);
                  setRespuesta("Producto registrado correctamente");
                } else {
                  setOk(false);
                  setRespuesta("Error al registrar el producto");
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form className="fieldset">
                  <label className="label flex flex-col items-start">
                    Nombre
                    <Field name="nombre" className="input" />
                  </label>
                  <ErrorMessage
                    name="nombre"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Descripción
                    <Field name="description" className="input" />
                  </label>
                  <ErrorMessage
                    name="description"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Categoría
                  </label>
                  <Field name="category" className="input" />
                  <ErrorMessage
                    name="category"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Precio
                  </label>
                  <Field name="price" type="number" className="input" />
                  <ErrorMessage
                    name="price"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Stock
                  </label>
                  <Field name="stock" type="number" className="input" />
                  <ErrorMessage
                    name="stock"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Imagen
                  </label>

                  <Field
                    name="image"
                    type="file"
                    className="file-input"
                    value={undefined}
                    onChange={(event: any) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                    }}
                  />

                  <button type="submit" className="btn btn-neutral mt-4">
                    Registrar
                  </button>
                  {respuesta && (
                    <div className={ok ? "text-green-400" : "text-red-400"}>
                      {respuesta}
                    </div>
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
