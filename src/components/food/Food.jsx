import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";
import { classNames } from "../../helpers/classNames/classNames";
import loadingGif from "../../images/loading.svg";
import "./food.scss";

function Food({ food, addClasses, id }) {
  const [count, setCount] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    pushToLocalStorage,
    updateStateAfterLocalStorage,
    deleteFromLocalStorage,
  } = useContext(GeneralContext);
  const { user, deleteFood } = useContext(GeneralFirebaseContext);
  const navigate = useNavigate();
  let mainClass = classNames([], addClasses);

  useEffect(() => {
    if (mainClass === "basketItem") {
      setQuantity(food.quantity);
    }
    updateStateAfterLocalStorage();
  }, []);

  const onBasketBtn = () => {
    if (user) {
      console.log(id);
      const s = new Promise((resolve, reject) => {
        resolve(deleteFood(id));
      });

      s.then(() => window.location.reload(true)).catch(() =>
        alert("Не получилось удалить")
      );
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      if (mainClass !== "basketItem") {
        const orderData = { ...food, quantity: count };
        pushToLocalStorage(orderData, count);
        updateStateAfterLocalStorage();
      } else {
        deleteFromLocalStorage(food);
        updateStateAfterLocalStorage();
      }
    }, 500);
  };

  const increment = (s) => {
    if (mainClass !== "basketItem") {
      setCount((prev) => prev + 1);
    } else {
      let getDataFromLocalS = JSON.parse(localStorage.getItem("orders"));
      let newQuantity;
      let newData = getDataFromLocalS.map((item) => {
        if (food.name === item.name) {
          item.quantity = item.quantity + 1;
          newQuantity = item.quantity;
          return item;
        } else {
          return item;
        }
      });

      localStorage.setItem("orders", JSON.stringify(newData));
      updateStateAfterLocalStorage();
    }
  };

  const decrement = () => {
    if (mainClass !== "basketItem") {
      setCount((prev) => (prev > 1 ? prev - 1 : prev));
    } else {
      let getDataFromLocalS = JSON.parse(localStorage.getItem("orders"));
      let newQuantity;
      let newData = getDataFromLocalS.map((item) => {
        if (food.name === item.name && item.quantity > 1) {
          item.quantity = item.quantity - 1;
          newQuantity = item.quantity;
          return item;
        } else {
          return item;
        }
      });

      localStorage.setItem("orders", JSON.stringify(newData));
      updateStateAfterLocalStorage();
    }
  };

  return (
    <div className={mainClass}>
      <div
        className={`${mainClass}__image`}
        onClick={() => navigate(`/${food.name}`)}
      >
        <img src={food.img} alt={food.name} />
      </div>
      <div className={`${mainClass}__info`}>
        <h1
          onClick={() => navigate(`/${food.name}`)}
          className={`${mainClass}__title`}
        >
          {food.name}
        </h1>
        <p>{mainClass === "foodPage" && food.description}</p>
        <div className={`price-block`}>
          <div className="food-price">{food.price} p.</div>
          <div className="food-count">
            <button onClick={decrement}>-</button>
            {mainClass === "basketItem" ? (
              <span>{food.quantity}</span>
            ) : (
              <span>{count}</span>
            )}
            <button onClick={increment}>+</button>
          </div>
        </div>
        <button
          disabled={isLoading}
          className={classNames([`basket-btn ${mainClass}-btn`], {
            disabledBtn: isLoading,
          })}
          onClick={() => onBasketBtn(mainClass)}
        >
          {!isLoading && (
            <>
              {mainClass === "basketItem" || user
                ? "Удалить"
                : "Добавить в корзину"}
            </>
          )}

          {isLoading && <img className="loadingImg" src={loadingGif} alt="" />}
        </button>
      </div>
    </div>
  );
}

export default Food;
