import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useCallback, useState } from "react";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-17c61-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchData()
      .then()
      .catch((e) => {
        setIsLoading(false);
        setHttpError(e.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsError}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
