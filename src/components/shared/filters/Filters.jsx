import { useState } from "react";
import { formSerialize } from "../../util/util";
import "./Filters.css";

export const Filters = ({ getFilter, categories }) => {
  const [action, setAction] = useState("");
  const submitEvent = (event) => {
    event.preventDefault();
    try {
      const form = formSerialize(event.target);
      if (form[action] !== "") {
        const filterAction =
          action === "name"
            ? (list) =>
                list.filter((x) => new RegExp(form[action], "i").test(x.name))
            : action === "category"
            ? (list) => list.filter((x) => x.category === form[action])
            : (list) =>
                list.filter(
                  (x) => parseFloat(x.price) <= parseFloat(form[action])
                );
        getFilter(filterAction);
      } else getFilter(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filterInputs = [
    { type: "text", name: "name", title: "Consultar por nombre" },
    {
      type: "select",
      name: "category",
      title: "Consultar x categoría",
      options: categories,
    },
    {
      type: "number",
      name: "price",
      title: "Consultar por menor precio (menor o igual a)",
    },
  ];

  return (
    <div className="container">
      <form onSubmit={submitEvent}>
        {filterInputs.map((input, key) => (
          <div className="d-flex justify-space-between pb-2" key={key}>
            <div className="title">{input.title}</div>
            <div className="field px-3">
              <div className="" key={key}>
                {/text|number/.test(input.type) ? (
                  <input
                    type={input.type}
                    className="form-control"
                    name={input.name}
                    onChange={() => setAction(input.name)}
                  />
                ) : input.type === "select" ? (
                  <select
                    name={input.name}
                    className="form-select"
                    onChange={() => setAction(input.name)}
                  >
                    {input.options &&
                      input.options.length > 0 &&
                      input.options.map((option, idx) => (
                        <option className="text-capitalize" key={idx}>
                          {option}
                        </option>
                      ))}
                  </select>
                ) : (
                  ""
                )}
                <button className="btn btn-info btn-outline">Aceptar</button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};
