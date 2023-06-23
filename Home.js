import AsyncStorage from "@react-native-async-storage/async-storage"
import SQLite from "react-native-sqlite-storage"
import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Alert, TextInput } from "react-native"
import CustomButton from "./src/utils/CustomButton.js"
import GlobalStyle from "./src/utils/GlobalStyle.js"

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

export default function Home({ navigation, route }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    try {
      // AsyncStorage.getItem("UserData").then((value) => {
      //   if (value != null) {
      //     let user = JSON.parse(value)
      //     setName(user.Name)
      //     setAge(user.Age)
      //   }
      // })
      db.transaction((tx) => {
        tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
          var len = results.rows.length
          if (len > 0) {
            var userName = results.rows.item(0).Name
            var userAge = results.rows.item(0).Age
            setName(userName)
            setAge(userAge)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert("Warning!", "Please write your data.")
    } else {
      try {
        // var user = {
        //   Name: name,
        // }
        // await AsyncStorage.mergeItem("UserData", JSON.stringify(user))
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Users SET Name=?",
            [name],
            () => {
              Alert.alert("Success!", "Your data has been updated.")
            },
            (error) => {
              console.log(error)
            }
          )
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeData = async () => {
    try {
      // await AsyncStorage.clear()
      // navigation.navigate("Login")

      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Users",
          [],
          () => {
            navigation.navigate("Login")
          },
          (error) => {
            console.log(error)
          }
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Welcome {name} !
      </Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Your age is {age}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <CustomButton
        title="Update"
        color="#f0b700"
        onPressFunction={updateData}
      />
      <CustomButton
        title="Remove"
        color="#f40100"
        onPressFunction={removeData}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 65,
  },
  text: {
    fontSize: 35,
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
    marginTop: 130,
    marginBottom: 10,
  },
})
