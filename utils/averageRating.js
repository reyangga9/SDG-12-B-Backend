export const calculateAverageRating = (restaurantData) => {
  const ratings = restaurantData.rating;
  if (ratings.length === 0) {
    return 0; // Return 0 if there are no ratings
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = totalRating / ratings.length;
  return averageRating;
};
