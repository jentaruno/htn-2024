import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FoodInfoItem} from "./FoodInfoItem";

const FoodInfoListItem = [
  {
    productName: "манная с маслом",
    productNameTranslation: "Semolina with Butter (2)",
    possibleAllergens: ["Dairy", "Gluten"],
    number: 2
  },
  {
    productName: "Гречка с маслом",
    productNameTranslation: "Buckwheat with Butter (9)",
    possibleAllergens: ["Dairy", "Gluten", "Peanuts", "Sulphite", "Sesame Seeds", "Wheat & Triticale", "Mustard", "Gelatin", "Soy"],
    number: 9
  },
  {
    productName: "овсянка с маслом",
    productNameTranslation: "Oatmeal with Butter (2)",
    possibleAllergens: ["Dairy", "Gluten"],
    number: 2
  },
  {
    productName: "Рисовая с маслом",
    productNameTranslation: "Rice with Butter (2)",
    possibleAllergens: ["Dairy", "Gluten"],
    number: 2
  },
  {
    productName: "пшенная с маслом",
    productNameTranslation: "Millet with Butter (4)",
    possibleAllergens: ["Dairy", "Gluten", "Peanuts", "Eggs"],
    number: 4
  }
];

export default function FoodInfo() {
  const [selectedFood, setSelectedFood] = useState(null);

  // Function to get color based on the number
  const getButtonColor = (number) => {
    if (number <= 2)
      return '#34C759';
    else if (number <= 4)
      return '#F9A61F'
    else
      return '#FF3B30'
  };

  return (
    <View style={styles.container}>
      {FoodInfoListItem.map((food, index) => (
        <FoodInfoItem
            key={index}
            buttonColor={getButtonColor(food.possibleAllergens.length)}
            name={food.productNameTranslation}
            originalName={food.productName}
            possibleAllergens={food.possibleAllergens}
            isSelected={selectedFood === index}
            onPress={() => setSelectedFood(index)}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  foodItem: {
    width: '100%',
    marginBottom: 10,
  },
});
