import { FlatList, StyleSheet, View, Text } from "react-native";
import { fetchProducts } from "./api/api";
import ItemCard from "./components/ItemCard";
import ItemModal from "./components/ItemModal";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const renderItem = ({ item }) => (
    <ItemCard
      id={item.id}
      imageUrl={item.image}
      title={item.title}
      rating={item.rating.rate}
      rateCount={item.rating.count}
      price={item.price}
      category={item.category}
      description={item.description}
      onPress={() => setSelectedItem(item)}
    />
  );

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Shopping</Text>
        </View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        {selectedItem && (
          <ItemModal
            id={selectedItem.id}
            imageUrl={selectedItem.image}
            description={selectedItem.description}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#80d9e1",
    padding: 15,
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
