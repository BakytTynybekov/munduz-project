import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import "./orders.scss";
import { useState } from "react";
import Select from "react-select";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";

const options = [
  { value: "active", label: "Активные" },
  { value: "inProcess", label: "В процессе" },
];

function Orders() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: "active",
    label: "Активные",
  });
  const { allOrders, updateOrder, deleteOrder } = useContext(
    GeneralFirebaseContext
  );

  useEffect(() => {
    filterOrders();
  }, [allOrders, selectedOption]);

  const filterOrders = () => {
    if (allOrders) {
      let data = allOrders.filter(
        (item) => item.data.status === selectedOption.value
      );
      setFilteredOrders(data);
    }
  };

  const copyContent = async (text) => {
    try {
      let newArr = text.map((food) => {
        let z = { quantity: food.quantity, name: food.name };
        return z;
      });
      const s = await newArr
        .map(({ name, quantity }) => {
          return name + " " + quantity + " шт. ";
        })
        .join("");

      await navigator.clipboard.writeText(s);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleChangeStatus = (id, data) => {
    if (data.status === "inProcess") {
      const changeSt = new Promise((resolve, reject) => {
        resolve(deleteOrder(id));
      });
      changeSt
        .then(() => window.location.reload(true))
        .catch(() => alert("Не получилось обновить статус"));
    } else {
      let newData = { ...data, status: "inProcess" };
      const changeSt = new Promise((resolve, reject) => {
        resolve(updateOrder(id, newData));
      });
      changeSt
        .then(() => setTimeout(() => window.location.reload(true), 1000))
        .catch(() => alert("Не получилось обновить статус"));
    }
  };

  return (
    <div className="ordersPage">
      <h1>Заказы</h1>
      <div className="tabs-mobile">
        <Select
          className="aaa"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <div className="tabs">
        {options.map((tab, index) => {
          return (
            <button
              className={
                tab.value === selectedOption.value
                  ? "tabs-btn active-btn"
                  : "tabs-btn"
              }
              onClick={() =>
                setSelectedOption({ value: tab.value, label: tab.label })
              }
              data-cat={tab.value}
              key={index}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="orders">
        {filteredOrders?.map(({ data, id }, i) => (
          <div key={id} className="order">
            <h3> {data.tableNumber} - стол</h3>
            <ul className="order-inner">
              {data?.order.map((food, i) => (
                <li key={i}>
                  <h4>
                    {food.name} - {food.quantity} шт.
                  </h4>
                </li>
              ))}
            </ul>
            <div className="order-footer">
              <span className="copy" onClick={() => copyContent(data?.order)}>
                Скопировать
              </span>
              <button onClick={() => handleChangeStatus(id, data)}>Ок</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
