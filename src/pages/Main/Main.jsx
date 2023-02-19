import { useContext, useEffect, useState } from "react";
import Food from "../../components/food/Food";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";
import { classNames } from "../../helpers/classNames/classNames";
import Loading from "../LoadingPage/Loading";
import "./main.scss";

function Main() {
  const { allFoods } = useContext(GeneralFirebaseContext);
  const [filteredFoods, setFilteredFoods] = useState(null);
  const [category, setCategory] = useState("Салаты");
  const [categories, setCategories] = useState([]);

  function filterFoods() {
    if (allFoods) {
      const s = allFoods.filter(({ data, id }, i) => data.cat === category);
      const cats = allFoods.map(({ data, id }) => data.cat);
      setCategories(Array.from(new Set(cats)));
      setFilteredFoods(s);
    }
  }
  const changeCat = (e, cat) => {
    setCategory(cat);
  };

  useEffect(() => {
    filterFoods();
  }, [allFoods, category]);

  return (
    <>
      {allFoods ? (
        <div className="main">
          <div className="container">
            <div className="main__inner">
              <h1>{category}</h1>

              <div className="main__header">
                {categories?.map((cat, i) => (
                  <div
                    onClick={(e) => changeCat(e, cat)}
                    key={i}
                    className={classNames(["cat-item"], {
                      activeCat: cat === category,
                    })}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              <div className="main__body">
                {filteredFoods?.map(({ data, id }, i) => (
                  <Food
                    key={id}
                    id={id}
                    food={data}
                    addClasses={{ food: true }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Main;
