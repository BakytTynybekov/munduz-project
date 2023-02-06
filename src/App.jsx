import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import About from "./pages/About/About";
import AddProduct from "./pages/AddFood/AddProduct";
import Basket from "./pages/Basket/Basket";
import FoodPage from "./pages/FoodPage/FoodPage";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Orders from "./pages/orders/Orders";
import SuccessPage from "./pages/succes/SuccessPage";
import { SuccessPageAsync } from "./pages/succes/SuccessPageAsync";
import loadingImg from "./images/loading.svg";
import { MainPageAsync } from "./pages/Main/MainAsync";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  <img src={loadingImg} alt="" />
                </div>
              }
            >
              <MainPageAsync />
            </Suspense>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:food" element={<FoodPage />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/success"
          element={
            <Suspense
              fallback={
                <div className="loading">
                  <img src={loadingImg} alt="" />
                </div>
              }
            >
              <SuccessPageAsync
                message={"Ваш заказ принят. Ожидайте официанта, пожалуйста..."}
              />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
