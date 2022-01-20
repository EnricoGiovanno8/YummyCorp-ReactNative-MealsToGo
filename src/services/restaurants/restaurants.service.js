import camelize from "camelize";

export const restaurantsRequest = (location) => {
  return fetch( // tidak akan jalan di android karena android harus dari https, dan firebase tidak bisa run di https
    `http://localhost:5001/mealstogo-9e1ef/us-central1/placesNearby?location=${location}`
  ).then((res) => {
    return res.json();
  })
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
