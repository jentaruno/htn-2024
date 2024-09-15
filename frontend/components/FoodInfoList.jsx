import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FoodInfoItem} from "./FoodInfoItem";

const FoodInfoListItem = [
  {
    "productName": "пшенная с маслом",
    "productNameTranslation": "millet with butter",
    "description": "millet porridge with butter",
    "possibleAllergens": [
      "Wheat",
      "Milk"
    ]
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
            onPress={() => selectedFood === index
                ? setSelectedFood(-1)
                : setSelectedFood(index)}/>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
