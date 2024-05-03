import React, { useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";

function HomeScreen({ navigation }) {
    
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

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/home.jpg')} // Remplacez ceci par le chemin de votre image
            />
            <ThemedButton 
                name="bruce" 
                type="anchor" 
                style={styles.button}
                onPress={() => navigation.navigate('Options')}
                backgroundColor="#F3b700" 
            >
                <Text style={styles.buttonText}>Start</Text>
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
    image: {
        width: 300,
        height: 500,
        marginBottom: 20,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
