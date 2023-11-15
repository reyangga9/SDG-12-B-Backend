export const calculateDiscountedPrice = (harga, discountPercentage) => {
  const discountAmount = (discountPercentage / 100) * harga;
  const discountedPrice = harga - discountAmount;
  return discountedPrice;
};
