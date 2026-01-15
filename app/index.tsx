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
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    // function load
    async function loadFruit(){
        const data = await AsyncStorage.getItem("fruit")
        if(data != ""){
            setFruit(data!.toString())
        }
    }

    // function delete
    async function removeFruit(){
        await AsyncStorage.removeItem("fruit")
    }
    return(
        <View style={myStyles.container}>
            {/* แสดงสิ่งที่บันทึกไว้ */}
            <Text>Fruit : {fruit}</Text>

            {/* สำหรับการรับข้อความ */}
            <TextInput style={myStyles.input} value={text} onChangeText={setText}/>

            {/* ปุ่มบันทึก */}
            <TouchableOpacity onPress={saveFruit}>
                <Text>Save</Text>
            </TouchableOpacity>

            {/* ปุ่มลบ */}
            <TouchableOpacity onPress={removeFruit}>
                <Text>Delete</Text>
            </TouchableOpacity>

        </View>
    )
    
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    input:{
        borderWidth:1,
        width:"80%",
    }
})