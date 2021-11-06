import { Link } from "react-router-dom";

import "./Menu.css";

export const Menu = () => {
  const options = [    
    { name: "/products", title: "Listado de productos" },
    { name: "/catalog", title: "Catalogo de productos" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container justify-content-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex" id="navbarSupportedContent">
          <ul className="d-flex  me-auto mb-2 mb-lg-0 m-auto">
            {options.map((e, idx) => (
              <li className="nav-item" key={idx}>
                <Link className="nav-link active" to={e.name}>
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
