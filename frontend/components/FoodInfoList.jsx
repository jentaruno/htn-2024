import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FoodInfoListItem = [
  {
    original: "манная с маслом",
    name: "Semolina with Butter (2)",
    allergens: ["Dairy", "Gluten"],
    number: 2
  },
  {
    original: "Гречка с маслом",
    name: "Buckwheat with Butter (9)",
    allergens: ["Dairy", "Gluten", "Peanuts", "Sulphite", "Sesame Seeds", "Wheat & Triticale", "Mustard", "Gelatin", "Soy"],
    number: 9
  },
  {
    original: "овсянка с маслом",
    name: "Oatmeal with Butter (2)",
    allergens: ["Dairy", "Gluten"],
    number: 2
  },
  {
    original: "Рисовая с маслом",
    name: "Rice with Butter (2)",
    allergens: ["Dairy", "Gluten"],
    number: 2
  },
  {
    original: "пшенная с маслом",
    name: "Millet with Butter (4)",
    allergens: ["Dairy", "Gluten", "Peanuts", "Eggs"],
    number: 4
  }
];

export default function FoodInfo() {
  const [selectedFood, setSelectedFood] = useState(null);

  // Function to get color based on the number
  const getButtonColor = (number) => {
    switch (number) {
      case 2:
        return '#34C759'; 
      case 4:
        return '#F9A61F'; 
      case 9:
        return '#FF3B30'; 
      default:
        return '#ddd'; 
    }
  };

  return (
    <View style={styles.container}>
      {FoodInfoListItem.map((food, index) => (
        <View key={index} style={styles.foodItem}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: getButtonColor(food.number) }, 
              selectedFood === food.name && styles.activeButton
            ]}
            onPress={() => setSelectedFood(selectedFood === food.name ? null : food.name)}
          >
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodOriginal}>{food.original}</Text>
          </TouchableOpacity>

          {selectedFood === food.name && (
            <View style={styles.allergenContainer}>
              <Text style={styles.allergenTitle}>Allergens:</Text>
              {food.allergens.map((allergen, idx) => (
                <Text key={idx} style={styles.allergenText}>{allergen}</Text>
              ))}
            </View>
          )}
        </View>
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
  button: {
    padding: 15,
    marginVertical: 5,
    width: '100%',
    alignItems: 'flex-start', 
    justifyContent: 'center',
    borderRadius: 15, 
    borderWidth: 2,
    borderColor: '#000', 
    elevation: 3, 
    shadowColor: '#000'
  },
  activeButton: {
    borderColor: '#000', 
  },
  foodName: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  foodOriginal: {
    fontSize: 14, 
    color: '#000',
    marginTop: 5,
  },
  allergenContainer: {
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '100%',
  },
  allergenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  allergenText: {
    fontSize: 14,
    color: '#ff6347',
  },
});
