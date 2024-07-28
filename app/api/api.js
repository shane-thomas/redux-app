export const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    //   console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.log("Failed to fetch products due to error:", error);
    return [];
  }
};
