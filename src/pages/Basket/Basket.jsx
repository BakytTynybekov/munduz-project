import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Food from "../../components/food/Food";
import { GeneralContext } from "../../context/GeneralContext";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";
import { foodsData } from "../../data";
import "./basket.scss";

function Basket() {
  const [tableNumber, setTableNumber] = useState("");
  const { local, updateStateAfterLocalStorage, sum } =
    useContext(GeneralContext);
  const { addOrder } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();
  useEffect(() => {
    updateStateAfterLocalStorage();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (local) {
      const data = { tableNumber: tableNumber, order: local, status: "active" };
      addOrder(data);
      localStorage.removeItem("orders");
      navigate("/success");
      updateStateAfterLocalStorage();
    }
  };

  return (
    <div className="basket">
      <div className="container">
        <div className="basket__inner">
          <h2>Ваш заказ</h2>
          <div className="order-type">
            <p>Выберите вид заказа:</p>
            <div className="order-type-btns">
              <button className="active-btn">На месте</button>
              <button>Доставка</button>
            </div>
            <div className="order-details">
              <h3>Напишите номер стола</h3>
              <input
                className="table-number"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="basket-orders-container">
            <div className="basket__orders">
              {local?.map((food, i) => (
                <Food
                  key={food.name + i}
                  food={food}
                  addClasses={{
                    foodPage: false,
                    basketItem: true,
                    food: false,
                  }}
                />
              ))}
            </div>
            <div className="basket__summary">
              <h2>Ваш заказ</h2>
              <ul>
                {local?.map((food, i) => (
                  <li key={food.name + i} className="basket__summary-item">
                    <div>
                      <img src={food.img} alt={food.name} />
                    </div>
                    <div>
                      <h4>{food.name}</h4>
                      <span>{food.price} p. </span>
                      <span> x{food.quantity}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-price">
                <h3>Итого:</h3>
                <p>{sum[0]} p.</p>
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="table">Номер вашего стола: </label>
                <input
                  className="table-number"
                  type="text"
                  name="table"
                  value={`${tableNumber}`}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                />

                <button type="submit" className="basket-btn">
                  Оформить заказ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;
