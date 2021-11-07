import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import editImage from "../../../assets/img/edit.svg";
import removeImage from "../../../assets/img/delete.svg";
import { Filters } from "../../shared/filters/Filters";
import { toLower } from "../../util/util";

export const Products = (props) => {
  const [columns, setColumn] = useState([]);
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  //   const [isCatalog, setCatalog] = useState(false);
  const navigate = useNavigate();

  const TITLE = "Listado de productos";
  const TITLE_CATALOG = "Catalogo de productos";
  const CONFIRM_DELETE_QUESTION = "¿Confirma la eliminación del producto?";
  const CONFIRM_DELETE = "¡Sí, estoy seguro!";
  const CANCEL_DELETE = "No, cancelar";
  const NEW_PRODUCT_ROUTE = "/product/new";
  const LINK = "http://localhost:8080/api/v1/products";
  const AXIOS_OPTS = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const isCatalog = props.action === "catalog" ? true : false;
  // setCatalog(isCatalogTemp);

  useEffect(() => {
    const col = getColumns();
    setColumn(col);
    setColumnData(setData);
    setCategoriesData();
  }, [props]);

  const getFilterData = (filterAction) => {
    let filterData = data;
    if (filterAction !== false) filterData = filterAction(data);

    setDataFiltered(filterData);
  };

  const getProducts = async () => {
    let response = [];
    try {
      let products = await axios(LINK, AXIOS_OPTS);
      products = products.data;
      response = products;
    } catch (error) {
      console.log(`error`, error);
    }
    return response;
  };

  const editAction = (item) => navigate("/product/" + item);

  const removeAction = async (item) => {
    const confirm = await Swal.fire({
      title: CONFIRM_DELETE_QUESTION,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: CONFIRM_DELETE,
      cancelButtonText: CANCEL_DELETE,
    });

    if (confirm.isConfirmed) {
      const url = `${LINK}/${item}`;
      const dataDelete = {};
      const AXIOS_OPTS_DELETE = {
        ...AXIOS_OPTS,
        url,
        method: "DELETE",
        data: dataDelete,
      };
      const deleteAction = await axios(AXIOS_OPTS_DELETE);
      Swal.fire({
        title: deleteAction.data,
      });
      setTimeout(() => window.location.reload(), 3000);
    }
  };

  const getActions = (item) => {
    return (
      <>
        <button
          type="button"
          title="Editar"
          className="border-none no-background"
          onClick={() => editAction(item)}
        >
          <img width="30px" src={editImage} alt="editar" />
        </button>
        <button
          type="button"
          title="Eliminar"
          className="border-none no-background"
          onClick={() => removeAction(item)}
        >
          <img width="20px" src={removeImage} alt="eliminar" />
        </button>
      </>
    );
  };

  const checkAvailability = (state) => (state === true ? "Si" : "No");
  const renderImage = (link) =>
    link ? (
      <img
        src={link + "?temp=" + Math.random() * 10000}
        width="100px"
        alt="imagen"
      />
    ) : (
      "-"
    );

  const getColumns = () => {
    const colum = [
      {
        name: "Nombre",
        selector: (row) => row.name,
      },
      {
        name: "Categoría",
        selector: (row) => row.category,
      },
      {
        name: "Descripción",
        selector: (row) => row.description,
      },
      {
        name: "Disponibilidad",
        selector: (row) => checkAvailability(row.availability),
      },
      {
        name: "Precio",
        selector: (row) => row.price,
      },
      {
        name: "Cantidad disponible",
        selector: (row) => row.stockQuantity,
      },
    ];
    if (!isCatalog) {
      colum.push({
        name: "Acciones",
        selector: (row) => getActions(row.id),
      });
    } else {
      colum.push({
        name: "Imagen",
        selector: (row) => renderImage(row.imageUrl),
      });
    }

    const clearColumn = colum.map((e) => {
      return { ...e, sortable: true };
    });
    return clearColumn;
  };

  const setCategoriesData = () => {
    let uniqueCategories = [];
    for (const item of data) {
      if (
        uniqueCategories.find((x) => toLower(x) === toLower(item.category)) ===
        undefined
      )
        uniqueCategories.push(toLower(item.category));
    }
    setCategories(uniqueCategories);
  };

  const setColumnData = async (setData) => {
    const data = await getProducts();
    setData(data);
    setDataFiltered(data);
  };

  const newProduct = () => {
    return (
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-success btn-outline"
          onClick={() => navigate(NEW_PRODUCT_ROUTE)}
        >
          Agregar producto
        </button>
      </div>
    );
  };

  return data && data.length > 0 ? (
    <>
      <h2>{isCatalog ? TITLE_CATALOG : TITLE}</h2>
      {isCatalog ? (
        <Filters getFilter={getFilterData} categories={categories} />
      ) : (
        ""
      )}
      {!isCatalog ? newProduct() : ""}
      <DataTable columns={columns} data={dataFiltered} />
    </>
  ) : (
    ""
  );
};
