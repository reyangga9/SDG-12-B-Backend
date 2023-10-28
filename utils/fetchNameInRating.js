export const fetchUserNames = async (highestSellsRestaurant, User) => {
  try {
    // Step 2: Extract unique user IDs from the result
    const userIds = Array.from(
      new Set(
        highestSellsRestaurant
          .map((restaurant) => restaurant.rating)
          .flat() // Flatten the nested array of ratings
          .map((rating) => rating.userId)
      )
    );

    // Step 3: Fetch user names based on user IDs
    const userNames = {}; // A map to store userId-to-name mapping
    const users = await User.find({ _id: { $in: userIds } });

    users.forEach((user) => {
      userNames[user._id] = user.username;
    });

    // Step 4: Replace userId with user name in the result
    highestSellsRestaurant.forEach((restaurant) => {
      restaurant.rating.forEach((rating) => {
        rating.name = userNames[rating.userId];
      });
    });

    return highestSellsRestaurant;
  } catch (error) {
    throw error;
  }
};

export const fetchUserName = async (restaurant, User) => {
  try {
    // Step 1: Extract unique user IDs from the rating of the single restaurant
    const userIds = Array.from(
      new Set(restaurant.rating.map((rating) => rating.userId))
    );

    // Step 2: Fetch user names based on user IDs
    const userNames = {}; // A map to store userId-to-name mapping
    const users = await User.find({ _id: { $in: userIds } });

    users.forEach((user) => {
      userNames[user._id] = user.username; // Assuming 'nama' is the user's name field
    });

    // Step 3: Replace userId with user name in the result
    const ratingsWithNames = restaurant.rating.map((rating) => {
      const name = userNames[rating.userId];
      return {
        rating: rating.rating,
        userId: rating.userId,
        comment: rating.comment,
        name,
      };
    });

    restaurant.rating = ratingsWithNames;

    return restaurant;
  } catch (error) {
    throw error;
  }
};
