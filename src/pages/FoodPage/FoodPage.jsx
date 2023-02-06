import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Food from "../../components/food/Food";
import { GeneralFirebaseContext } from "../../context/GeneralFirabesContext";
import Loading from "../LoadingPage/Loading";
import "./foodPage.scss";

function FoodPage() {
  const params = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const { allFoods } = useContext(GeneralFirebaseContext);

  const getFoodData = () => {
    const foodItem = allFoods?.filter(
      ({ data, id }) => data.name === params.food
    )[0];
    console.log("hello", foodItem);
    setFoodItem(foodItem);
  };

  useEffect(() => {
    console.log("hello", params.food, allFoods);
    getFoodData();
  }, [allFoods]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {foodItem?.data ? (
        <div className="container">
          <Food
            food={foodItem?.data}
            addClasses={{ foodPage: true, food: false }}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default FoodPage;
