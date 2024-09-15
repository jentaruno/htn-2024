import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const allergenIcons = { //stays the same
  dairy: require("../assets/Milk.png"),
  gluten: require("../assets/gluten.png"),
  peanuts: require("../assets/peanuts.png"),
  sulphite: require("../assets/sulphite.png"),
  sesame: require("../assets/sesame.png"),
  wheat: require("../assets/wheat.png"),
  mustard: require("../assets/mustard.png"),
  gelatin: require("../assets/gelatin.png"),
  soy: require("../assets/soy.png"),
  eggs: require("../assets/eggs.png"),
};
  

export default function FoodInfo({foodInfos}) {
  const [selectedFood, setSelectedFood] = useState(null);
  const navigation = useNavigation();

  const getButtonColor = (number) => {
    if (number >= 1 && number <= 3) {
      return '#34C759'; 
    } else if (number >= 4 && number <= 6) {
      return '#F9A61F'; 
    } else if (number >= 7 && number <= 9) {
      return '#FF3B30'; 
    } else {
      return '#ddd'; 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => navigation.navigate('camera')} 
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Image
            style={styles.image}
            source={require("../assets/back-button.png")}
          />
        </Pressable>
      </View>
      <Text style={styles.title}>Menu Information</Text>
      {foodInfos && foodInfos.length > 0 && foodInfos.map((food, index) => (
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
              <View style={styles.allergenList}>
                {food.allergens.map((allergen, idx) => (
                  <View key={idx} style={styles.allergenItem}>
                    <Image source={allergenIcons[allergen]} style={styles.allergenIcon} />
                    <Text style={styles.allergenText}>{allergen}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}
      </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#F9F5ED'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#F9F5ED',
  },
  image: {
    width: 50,
    height: 50,
  },
  foodItem: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#F9F5ED',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    backgroundColor: '#F9F5ED',
    borderRadius: 5,
    width: '100%',
  },
  allergenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  allergenList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  allergenIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  allergenText: {
    fontSize: 14,
    color: '#000',
  },
});
