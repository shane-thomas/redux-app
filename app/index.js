import { FlatList, StyleSheet, Text, View } from "react-native";
import { fetchProducts } from "./api/api";
import ItemCard from "./components/ItemCard";
import { useState, useEffect } from "react";
import ItemModal from "./components/itemModal";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const renderItem = ({ item }) => (
    <ItemCard
      imageUrl={item.image}
      title={item.title}
      rating={item.rating.rate}
      rateCount={item.rating.count}
      price={item.price}
      category={item.category}
      description = {item.description}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming products have an 'id' field
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
