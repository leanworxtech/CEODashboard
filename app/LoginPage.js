import { View, Text, Image, Pressable } from "react-native-web";
import React from "react";
// import { Link, useNavigation } from "expo-router";
import Axios from "axios";
import { useState } from "react";
import { StyleSheet, Modal, ToastAndroid, Linking } from "react-native";
import { apiUrl, headers, loginUrl, localhostApiUrl } from "../constants/urls";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import {
  DataTable,
  RadioButton,
  Avatar,
  Button,
  Card,
  Portal,
  PaperProvider,
  TextInput,
  Surface,
  Searchbar,
  TouchableRipple,
  HelperText,
  useTheme,
} from "react-native-paper";
import Checkbox from "expo-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRootComponent } from "expo";
import { useNavigation } from "expo-router";
import MainPage from "./MainPage";
import { useFonts } from "expo-font";
export default function LoginPage() {
  const style = StyleSheet.create({
    input: {
      borderColor: "white",
      color: "white",
      width: 300,
      backgroundColor: "#fcfafa",
      margin: 6,
      fontSize: 16,
      fontWeight: "semibold",
      marginLeft: 60,
    },
    image: {
      height: 160,
      width: 300,
      margin: 20,
      padding: 5,
      marginLeft: 60,
    },
    image1: {
      height: 150,
      width: 150,
      margin: 20,
      padding: 5,
    },
    flex1: {
      margin: 10,
      flexDirection: "row",
    },
    fill: { flex: 1, backgroundColor: "grey" },
    uppeer: { height: 400, backgroundColor: "white", opacity: 5 },
    lower: {
      flex: 1,
      backgroundColor: "grey",
      width: 750,
      height: 150,
      margin: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    default: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: "condensedBold",
      color: "white",
    },
    bold: {
      fontSize: 28,
      lineHeight: 24,
      fontWeight: "bold",
      color: "black",
      paddingTop: 25,
    },
    defaultSemiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 32,
      alignContent: "center",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color: "#0a7ea4",
    },
    cardContainer: {
      backgroundColor: " #000",

      borderRadius: 15,
      padding: 16,
      shadowColor: "black",

      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 14,
      width: 450,
      height: 1000,
      margin: "auto",
      // justifyContent: "center",
      alignItems: "center",
    },
    buttonprop: {
      borderColor: "white",
      backgroundColor: "green",
      height: 45,
      width: 100,
      margin: 20,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
      alignContent: "center",
      borderWidth: 3,
      borderRadius: 10,
    },
    surface: {
      padding: 8,
      height: 80,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
    container: {
      flex: 1,
      marginHorizontal: 16,
      marginVertical: 32,
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
    },
    paragraph: {
      fontSize: 15,
      color: "white",
    },
    checkbox: {
      margin: 8,
      color: "white",
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [array, setArray] = useState([]);
  const [customercode1, setCustomercode] = useState("");
  const [plantcode, setPlantcode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const appID = "WebClients";
  let [fontsLoaded] = useFonts({
    "ShadeBlue-2OozX": require("../assets/fonts/GarotaSans-Italic-FFP.ttf"), // Custom font
  });
  const sessionID = "";

  let authHeader = {
    Authorization: sessionID,
  };
  function showToast() {
    ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
  }
  function loginApi() {
    Axios.get(
      "http://192.168.1.15:9020/api/portalSession?appId=WebClients&appSecret=A0B035A1-DFE9-40D9-A17C-CE55BC1A9436"
    ).then((res) => {
      console.log("first Api result", res);
      sessionStorage.setItem("SessionId", res.data);
      const sessionauth = sessionStorage.getItem("SessionId");
      let headers3 = { Authorization: sessionauth };
      console.log(headers3);
      Axios.get("http://192.168.1.15:9020/api/customer/BTL", {
        headers: headers3,
      }).then((res2) => {
        console.log("second api result", res2);
        sessionStorage.setItem("CompanyName", res2.data.Name);
        var result = res2.data.Plants.filter((obj) => {
          return obj.IsDefault === true;
        });
        console.log("isDefault = true", result);
        setArray(result);
        sessionStorage.setItem("plantCode", result[0].ShortName);
        sessionStorage.setItem("userName", username);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("customerCode", customercode1);
        sessionStorage.setItem("appId", appID);
        console.log(sessionStorage.getItem("appId"));
        const plantcode = sessionStorage.getItem("plantCode");

        Axios.get(
          "http://192.168.1.15:9020/api/customer/validateUser?customerCode=" +
            customercode1 +
            "&plantCode=" +
            plantcode +
            "&userName=" +
            username +
            "&password=" +
            password
        ).then((res3) => {
          console.log(
            "http://192.168.1.15:9020/api/customer/validateUser?customerCode=" +
              customercode1 +
              "&plantCode=" +
              plantcode +
              "&userName=" +
              username +
              "&password=" +
              password
          );
          if (res3.data === true) {
            if (isChecked === true) {
              sessionStorage.setItem("plantCode", plantcode);
            }
            console.log(sessionStorage.getItem("customerCode"));
            navigation.navigate("MainPage");
          } else {
            alert("Invalid credentials, Please try again");
          }
        });
      });
    });
  }
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  function loginApiTest() {
    if (isChecked == true) {
      alert(isChecked);
    } else {
      alert(isChecked);
    }
  }

  return (
    <>
      <View style={{ backgroundColor: "#121111", flex: 1 }}>
        <Button
          onPress={() => Linking.openURL("https://leanworxcloud.com/")}
          icon="web"
          theme={{ colors: { primary: "white" } }}
          style={{
            marginLeft: 270,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Website
        </Button>
        <Image style={style.image} source={require("../assets/Leanworxlogo2.png")} />

        <TextInput
          style={style.input}
          label="Customer Code"
          onChangeText={(text) => setCustomercode(text)}
        ></TextInput>

        <TextInput
          style={style.input}
          label="User Name"
          onChangeText={(text) => setUsername(text)}
        ></TextInput>

        <TextInput
          secureTextEntry={true}
          style={style.input}
          label="Password"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <View style={style.section}>
          <Checkbox
            style={style.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            onChange={console.log(isChecked)}
          />
          <Text style={style.paragraph}>Remember User credentials</Text>
        </View>
        <Button
          onPress={loginApi}
          icon="login"
          mode="contained"
          theme={{ colors: { primary: "green" } }}
          style={{ margin: 10, width: 110, marginLeft: 160, marginBottom: 300 }}
        >
          LogIn
        </Button>
        <ToastContainer />

        <View style={style.flex1}>
          <Button
            onPress={() => Linking.openURL("https://api.whatsapp.com/send?phone=916361510924")}
            icon="whatsapp"
            theme={{ colors: { primary: "green" } }}
            style={{
              width: 20,
              height: 40,
              borderRadius: 100,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          ></Button>
          <ToastContainer />
          <Button
            onPress={() => setModalVisible(true)}
            icon="phone"
            theme={{ colors: { primary: "white" } }}
            style={{
              width: 20,
              height: 40,
              borderRadius: 100,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          ></Button>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={style.modalBackground}>
              <View style={style.modalContent}>
                <Text variant="large" style={{ marginRight: 20, fontWeight: "bold", fontSize: 15 }}>
                  Mon - Sat: 09am - 08pm
                </Text>
                <View style={style.flex1}>
                  <Button icon="phone" style={{ marginRight: 40, fontWeight: "bold" }}>
                    +91 9945515236
                  </Button>
                </View>
                <Button icon="email" style={{ marginRight: 40, fontWeight: "bold" }}>
                  sales@leanworxcloud.com
                </Button>
                <Text
                  variant="large"
                  style={{ marginRight: 20, fontWeight: "bold", fontSize: 15 }}
                ></Text>
                <Button
                  onPress={() => setModalVisible(false)}
                  style={{ marginRight: 30, marginBottom: 20 }}
                >
                  close
                </Button>
              </View>
            </View>
          </Modal>
          <ToastContainer />
        </View>
      </View>
    </>
  );
}
