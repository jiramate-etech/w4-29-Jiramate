import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

export default function Home(){
    const [text, setText] = useState("");
    const [fruit, setFruit] = useState("");

    // load var when open
    useEffect(() => {
        loadFruit()
    },[])

    // function save
    async function saveFruit(){
        if(!text) return; // Simple check to prevent saving empty text
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    // function load
    async function loadFruit(){
        const data = await AsyncStorage.getItem("fruit")
        if(data){
            setFruit(data)
        }
    }

    // function delete
    async function removeFruit(){
        await AsyncStorage.removeItem("fruit")
        setFruit("") // Update UI immediately after delete
    }

    return(
        <View style={myStyles.container}>
            
            {/* Header / Display Card */}
            <View style={myStyles.card}>
                <Text style={myStyles.label}>Current Fruit 🫐 :</Text>
                <Text style={myStyles.fruitText}>
                    {fruit ? fruit : "No fruit saved"}
                </Text>
            </View>

            {/* Input Section */}
            <TextInput 
                style={myStyles.input} 
                value={text} 
                onChangeText={setText}
                placeholder="Enter a fruit name..."
            />

            {/* Buttons Container */}
            <View style={myStyles.buttonContainer}>
                {/* Save Button */}
                <TouchableOpacity style={myStyles.saveButton} onPress={saveFruit}>
                    <Text style={myStyles.buttonText}>Save Fruit</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity style={[myStyles.saveButton, myStyles.deleteButton]} onPress={removeFruit}>
                    <Text style={myStyles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding: 20,
    },
    // Card style for the display area
    card: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 30,
        // Shadow for depth
        elevation: 5,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: 'blue',
    },
    fruitText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    // Modern input style
    input:{
        backgroundColor: 'white',
        width: "100%",
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        gap: 15, // Adds space between buttons
    },
    // Base button style (Blue)
    saveButton: {
        backgroundColor: '#4A90E2',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: "#4A90E2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    // Override for delete button (Red)
    deleteButton: {
        backgroundColor: '#FF5A5F',
        shadowColor: "#FF5A5F",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
})