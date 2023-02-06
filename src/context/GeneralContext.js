import { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext();

export function GeneralProvider({ children }) {
  const [sum, setSum] = useState([0, 0]);
  const [local, setLocal] = useState(null);

  const updateStateAfterLocalStorage = () => {
    const dataFromLocal = JSON.parse(localStorage.getItem("orders"));
    if (dataFromLocal) {
      const summa = dataFromLocal.reduce(
        (total, curr) => total + curr.quantity * curr.price,
        0
      );
      const kolichestvo = dataFromLocal.reduce(
        (total, curr) => total + curr.quantity,
        0
      );

      setSum([summa, kolichestvo]);
      setLocal(dataFromLocal);
    } else {
      setSum([0, 0]);
      setLocal(null);
    }
  };

  const deleteFromLocalStorage = (food) => {
    const data = JSON.parse(localStorage.getItem("orders"));
    const newData = data.filter((item) => item.name !== food.name);
    localStorage.setItem("orders", JSON.stringify(newData));
  };

  const pushToLocalStorage = (order, s) => {
    let newOrders = JSON.stringify([order]);
    let l = JSON.parse(localStorage.getItem("orders"));
    if (l && l.length > 0) {
      let data = l.filter((item) => item.name === order.name);
      if (data.length > 0) {
        let newStorage = l.map((item) => {
          if (item.name === order.name) {
            item.quantity = item.quantity + order.quantity;
            return item;
          } else {
            return item;
          }
        });
        localStorage.setItem("orders", JSON.stringify(newStorage));
      } else {
        let arr = [...l];
        arr.push(order);

        localStorage.setItem("orders", JSON.stringify(arr));
      }
    } else {
      localStorage.setItem("orders", newOrders);
    }
  };

  const data = {
    pushToLocalStorage,
    updateStateAfterLocalStorage,
    sum,
    setLocal,
    local,
    deleteFromLocalStorage,
  };
  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
}
