import React, { useState, useEffect } from "react"
import { View, StyleSheet, Image, Text, TextInput, Alert } from "react-native"
import CustomButton from "./src/utils/CustomButton.js"
// import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaView } from "react-native-safe-area-context"
import SQLite from "react-native-sqlite-storage"

const db = SQLite.openDatabase(
  {
    name: "MainDB",
    location: "default",
  },
  () => {},
  (error) => {
    console.log(error)
  }
)

export default function Login({ navigation }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  useEffect(() => {
    createTable()
    getData()
  }, [])

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS" +
          "Users " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
      )
    })
  }

  const getData = () => {
    try {
      AsyncStorage.getItem("UserData").then((value) => {
        if (value != null) {
          navigation.navigate("Home")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert("Warning!", "Please write your data.")
    } else {
      try {
        // var user = {
        //     Name: name,
        //     Age: age
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user));
        await db.transaction(async (tx) => {
          // await tx.executeSql(
          //     "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ")"
          // );
          await tx.executeSql("INSERT INTO Users (Name, Age) VALUES (?,?)", [
            name,
            age,
          ])
        })
        navigation.navigate("Home")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <SafeAreaView style={styles.body}>
      <Image style={styles.logo} source={require("./assets/favicon.png")} />
      <Text style={styles.text}>SQL Storage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={(value) => setAge(value)}
      />
      <CustomButton title="Login" color="#1eb900" onPressFunction={setData} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
    marginTop: 65,
  },
  text: {
    fontSize: 30,
    fontWeight: 700,
    color: "#181818",
    marginBottom: 70,
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
})
