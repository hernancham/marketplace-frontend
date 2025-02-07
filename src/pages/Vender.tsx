import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../libs/axiosInstance";
import { Redirect } from "wouter";
import { CustomSelect } from "../components/CustomSelect";

const registerSchema = Yup.object({
  titulo: Yup.string().required("Es requerido"),
  descripcion: Yup.string().required("Es requerido"),
  precio: Yup.number()
    .min(0, "Debe ser mayor o igual a 0")
    .required("Es requerido"),
  stock: Yup.number().min(1, "Debe ser mayor a 0").required("Es requerido"),
  image: Yup.mixed().required("Es requerido"),
  categoryIds: Yup.array()
    .of(Yup.string())
    .min(1, "Debe seleccionar al menos una categoría")
    .optional(),
});

export type CategoriesType = CategoryType[];
export interface CategoryType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products: any[];
}

export type Options = Option[];
export interface Option {
  value: string;
  label: string;
}

export default function Vender() {
  const { session } = useAuth();
  const [respuesta, setRespuesta] = useState<string>("");
  const [ok, setOk] = useState<boolean>(false);

  const [opciones, setOpciones] = useState<Options>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get<CategoriesType>("/categories");
        const data = response.data;
        const opcionesFormateadas = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOpciones(opcionesFormateadas);
      } catch (error) {
        console.error("Error al cargar opciones:", error);
      }
    };

    fetchOptions();
  }, []);

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
          <h1 className="text-5xl font-bold">Subir un producto</h1>
          <p className="py-6">
            Esta es la página para vender un producto. Aquí puedes vender un
            producto para acceder
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <Formik
              initialValues={{
                titulo: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                image: null,
                categoryIds: [],
              }}
              validationSchema={registerSchema}
              onSubmit={async (values) => {
                console.log(values);
                const response = await api.postForm("/images/upload", {
                  file: values.image,
                });
                console.log(response.data);
                const res = await api.post("/products", {
                  titulo: values.titulo,
                  descripcion: values.descripcion,
                  precio: values.precio,
                  stock: values.stock,
                  imageUrl: response.data.secure_url,
                  categoryIds: values.categoryIds,
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
                    Titulo
                    <Field name="titulo" className="input" />
                  </label>
                  <ErrorMessage
                    name="titulo"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Descripción
                    <Field name="descripcion" className="input" />
                  </label>
                  <ErrorMessage
                    name="descripcion"
                    className="text-red-400"
                    component="div"
                  />
                  <label className="label flex flex-col items-start">
                    Precio
                  </label>
                  <Field name="precio" type="number" className="input" />
                  <ErrorMessage
                    name="precio"
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
                  <ErrorMessage
                    name="image"
                    className="text-red-400"
                    component="div"
                  />

                  <label className="label flex flex-col items-start">
                    Categorias
                  </label>
                  <Field
                    className="text-gray-700"
                    name="categoryIds"
                    options={opciones}
                    component={CustomSelect}
                    placeholder="Selecciona las categorías"
                    isMulti={true}
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
