import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import FileBase64 from "react-file-base64";
import { formSerialize } from "../../util/util";
import "./Product.css";

function Product() {
  const EDITION_TITLE = "Edición";
  const CREATION_TITLE = "Creación";
  const CREATION_SUCCESS_TITLE = "Producto creado correctamente";

  const [product, setProduct] = useState({});
  const [action, setAction] = useState(CREATION_TITLE);
  const [inputs, setInputs] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const LINK = "http://localhost:8080/api/v1/products";
  const AXIOS_OPTS = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const { id } = useParams();

  const checkProductInfo = async (id) => {
    try {
      if (id !== "new") {
        const productConfig = { ...AXIOS_OPTS };
        productConfig.url = LINK + "/" + id;
        productConfig.method = "GET";
        const productInfo = await axios(productConfig);
        if (productInfo && productInfo.data) {
          setProduct(productInfo.data);
          setAction(EDITION_TITLE);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setClassFile = () => {
    document
      .querySelectorAll('input[type="file"]')
      .forEach((e) => e.classList.add("form-control"));
  };

  useEffect(() => {
    checkProductInfo(id);
    setClassFile();
  }, []);

  const getFiles = (files) => {
    setImageUrl(files[0].base64);
  };

  const formInputs = () => {
    return [
      {
        type: "text",
        name: "name",
        title: "Nombre",
        value: product.name || "",
      },
      {
        type: "text",
        name: "category",
        title: "Categoría",
        value: product.category || "",
      },
      {
        type: "number",
        name: "price",
        title: "Precio",
        value: product.price || "",
      },
      {
        type: "select",
        name: "availability",
        title: "Disponibilidad",
        options: [
          { value: true, title: "Si" },
          { value: false, title: "No" },
        ],
        value: product.availability || "",
      },
      {
        type: "number",
        name: "stockQuantity",
        title: "Cantidad en stock",
        value: product.stockQuantity || "",
      },
      {
        type: "file",
        name: "image",
        title: "Imagen",
        value: product.image || "",
      },
      {
        type: "textarea",
        name: "description",
        title: "Descripción",
        value: product.description || "",
      },
    ];
  };

  const inputsForm = formInputs();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitEvent = async (event) => {
    event.preventDefault();
    const data = formSerialize(event.target);
    data.imageUrl = imageUrl;
    const isCreation = action === CREATION_TITLE;

    const url = `${LINK}/${isCreation ? "" : id}`;
    const AXIOS_OPTS_PATCH = {
      ...AXIOS_OPTS,
      url,
      method: isCreation ? "POST" : "PATCH",
      data,
    };
    const updateAction = await axios(AXIOS_OPTS_PATCH);
    const title = isCreation ? CREATION_SUCCESS_TITLE : updateAction.data;
    Swal.fire({
      title,
    });
  };

  return (
    <div>
      <h1>{action} de producto</h1>
      <form className="p-3" onSubmit={submitEvent}>
        <div className="row justify-content-center">
          {inputsForm &&
            inputsForm.map((input, key) => (
              <div className="mb-3 col-12 col-sm-6" key={key}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  {input.title}
                </label>
                {/text|number/.test(input.type) &&
                !/textarea/.test(input.type) ? (
                  <input
                    type={input.type}
                    name={input.name}
                    className="form-control"
                    defaultValue={input.value}
                    onChange={handleChange}
                  />
                ) : input.type === "textarea" ? (
                  <textarea
                    className="form-control"
                    name={input.name}
                    defaultValue={input.value}
                    onChange={handleChange}
                  ></textarea>
                ) : input.type === "select" ? (
                  <select
                    name={input.name}
                    className="form-select"
                    defaultValue={input.value}
                    onChange={handleChange}
                  >
                    {input.options &&
                      input.options.length > 0 &&
                      input.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.title}
                        </option>
                      ))}
                  </select>
                ) : input.type === "file" ? (
                  <FileBase64
                    name={input.name}
                    multiple={true}
                    class="form-control"
                    onDone={getFiles}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
        <hr />
        <button type="submit" className="btn btn-primary col-4">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Product;
