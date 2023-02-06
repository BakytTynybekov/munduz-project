import { useContext } from "react";
import { useState } from "react";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";
import "./addProduct.scss";

const initialValue = {
  name: "",
  cat: "",
  description: "",
  img: "",
  price: "",
};
function AddProduct() {
  const [values, setValues] = useState(initialValue);
  const { addFood } = useContext(GeneralFirebaseContext);
  const handleSubmit = (e) => {
    e.preventDefault(e);
    addFood(values);
  };

  return (
    <div className="addProductsPage">
      <h1>Добавить девайс </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>
          <label htmlFor="">Название</label>
          <input
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            type="text"
            placeholder="Шорпо"
          />
        </p>
        <p>
          <label htmlFor="">Категория</label>
          <input
            required
            value={values.cat}
            onChange={(e) => setValues({ ...values, cat: e.target.value })}
            type="text"
            placeholder="Супы"
          />
        </p>
        <p>
          <label htmlFor="">Стоимость</label>
          <input
            value={values.price}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
            type="number"
            placeholder="Стоимость"
          />
        </p>
        <p>
          <label htmlFor="">Ссылка на фото</label>
          <input
            required
            value={values.img}
            onChange={(e) => setValues({ ...values, img: e.target.value })}
            type="text"
            placeholder="https://-------.jpg(png)..."
          />
        </p>
        <p>
          <label htmlFor="">Описание</label>
          <textarea
            required
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            type="text"
          />
        </p>
        <button type="submit">Добавить еду</button>
      </form>
    </div>
  );
}

export default AddProduct;
