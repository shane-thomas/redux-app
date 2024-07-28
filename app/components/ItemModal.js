import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";

export default function ItemModal({ id, imageUrl, description, onClose }) {
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addToCart({ id: id, imageUrl, description }));
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.descContainer}>
          <Text style={styles.desc}>Description:</Text>
          <Text style={[styles.desc, { flex: 2 }]}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAdd} style={styles.cartButton}>
            <MaterialIcons name="shopping-cart" color={"white"} size={23} />
            <Text style={styles.cartButtonText}> Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "white",
    // min-height: ,
    width: "95%",
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  descContainer: {
    display: "flex",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  desc: {
    flex: 1,
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  cartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  closeButton: {
    backgroundColor: "grey",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  closeButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
