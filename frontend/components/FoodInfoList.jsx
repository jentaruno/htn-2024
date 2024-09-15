import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FoodInfoItem} from "./FoodInfoItem";

export default function FoodInfoList({foodInfos}) {
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
      <View style={styles.listContainer}>
      {foodInfos && foodInfos.length > 0 && foodInfos.map((food, index) => (
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
  listContainer: {
    display: "flex",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})