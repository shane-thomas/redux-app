import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";

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
  imageUrl,
  title,
  rating,
  rateCount,
  price,
  category,
  description,
}) {
  return (
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

        <Text style={styles.price}>Rs. {price}</Text>
        <Text style={styles.category}>Category: {category}</Text>
      </View>
    </View>
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
    // alignItems: "center",
    // justifyContent:"space-between",
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
    flex:1,
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },

  category: {
    color: "grey",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
