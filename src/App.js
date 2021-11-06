import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Header } from "./components/shared/header/Header";
import { Footer } from "./components/shared/footer/Footer";
import { Menu } from "./components/shared/menu/Menu";

import { Products } from "./components/core/products/Products";
import Product from "./components/core/product/Product";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <section>
        <Router>
          <Menu />
          <div className="container py-5 mt-5 bg-white">
            <Routes>
              <Route path="/" exact element={<Products  />} />
              <Route path="/products" element={<Products />} />
              <Route path="/catalog" element={<Products action="catalog" />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </div>
        </Router>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
