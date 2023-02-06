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

  function filterFoods() {
    if (allFoods) {
      const s = allFoods.filter(({ data, id }, i) => data.cat === category);
      setFilteredFoods(s);
    }
  }
  const changeCat = (e, itemCat) => {
    setCategory(itemCat.cat);
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
                {allFoods?.map(({ data, id }, i) => (
                  <div
                    onClick={(e) => changeCat(e, data)}
                    key={id}
                    className={classNames(["cat-item"], {
                      activeCat: data.cat === category,
                    })}
                  >
                    {data.cat}
                  </div>
                ))}
              </div>

              <div className="main__body">
                {filteredFoods?.map(({ data, id }, i) => (
                  <Food
                    key={data.name + i}
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
