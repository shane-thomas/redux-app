import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cart/cartSlice";

const renderStars = (rating) => {
  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;

  return (
    <View style={styles.ratings}>
      {[...Array(fullStars)].map((_, index) => (
        <MaterialIcons
          key={`full-${index}`}
          name="star"
          size={25}
          color="#FFD700"
        />
      ))}

      {[...Array(emptyStars)].map((_, index) => (
        <MaterialIcons
          key={`empty-${index}`}
          name="star-border"
          size={25}
          color="#FFD700"
        />
      ))}
    </View>
  );
};

export default function ItemCard({
  id,
  imageUrl,
  title,
  rating,
  rateCount,
  price,
  category,
  onPress,
}) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.find((item) => item.id === id)
  );
  const itemQuantity = cartItem ? cartItem.quantity : 0;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {renderStars(rating)}
            <Text style={styles.category}> {rateCount}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.price}>Rs. {price}</Text>
            <View style={styles.counterContainer}>
              {itemQuantity > 0 && (
                <View style={styles.counter}>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(id))}
                    style={styles.counterButton}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{itemQuantity}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(
                        addToCart({
                          id,
                          imageUrl,
                          title,
                          price,
                          category,
                          rating,
                          rateCount,
                        })
                      )
                    }
                    style={styles.counterButton}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.category}>Category: {category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "grey",
    flexDirection: "row",
    padding: 5,
    height: 175,
    width: "95%",
    alignSelf: "center",
    marginVertical: 10,
  },
  image: {
    margin: 5,
    width: 125,
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  counterButton: {
    padding: 5,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  counterText: {
    paddingHorizontal: 10,
    fontSize: 18,
  },
  category: {
    color: "grey",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
