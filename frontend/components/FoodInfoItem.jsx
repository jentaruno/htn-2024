import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export function FoodInfoItem(
    {
        name,
        originalName,
        possibleAllergens,
        buttonColor,
        isSelected,
        onPress
    }) {
    return <View style={styles.foodItem}>
        <TouchableOpacity
            style={[
                styles.button,
                {backgroundColor: buttonColor},
                isSelected && styles.activeButton
            ]}
            onPress={onPress}
        >
            <Text style={styles.foodName}>{name}</Text>
            <Text style={styles.foodOriginal}>{originalName}</Text>
        </TouchableOpacity>

        {isSelected && (
            <View style={styles.allergenContainer}>
                <Text style={styles.allergenTitle}>Allergens:</Text>
                {possibleAllergens.map((allergen, idx) => (
                    <Text key={idx} style={styles.allergenText}>{allergen}</Text>
                ))}
            </View>
        )}
    </View>;
}

const styles = StyleSheet.create({
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