import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
;
import { ThemedButton } from "react-native-really-awesome-button";

import { Picker } from '@react-native-picker/picker';

function OptionsScreen({ navigation }) {


    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#F3B700',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });
    }, []);


    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const difficulties = [
        { id: '', name: 'Choose a difficulty' },
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' },
        { id: 'all', name: 'All' },
    ];
    const [selectedDifficulty, setSelectedDifficulty] = useState();

    const fetchCategories = async () => {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
    };



    const startQuiz = () => {
        if (selectedDifficulty === '') {
            Alert.alert(
                "Error",
                "Please choose a difficulty before starting the quiz.",
                [
                    { text: "OK" }
                ]
            );
        } else {
            navigation.navigate('QuizScreen', {
                category: selectedCategory,
                difficulty: selectedDifficulty,
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedDifficulty}
                    onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    {difficulties.map((difficulty) => (
                        <Picker.Item key={difficulty.id} label={difficulty.name} value={difficulty.id} />
                    ))}
                </Picker>
            </View>

            <ThemedButton
                name="bruce"
                type="anchor"
                style={styles.button}
                onPress={startQuiz} 
                backgroundColor="#F3b700"
            >
                <Text style={styles.buttonText}>Start Quiz</Text>
            </ThemedButton>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4c4c47',
        alignItems: 'center',
        justifyContent: 'center',
    },

    pickerContainer: {
        height: 60,
        width: 300,
        borderColor: '#F3b700',
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 10,
    },

    picker: {
        color: '#fff',
    },
    buttonText: {
        fontWeight: 'bold',
    }

});

export default OptionsScreen;
