import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animatable,
  StatusBar,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function App() {
  const { width, height } = Dimensions.get("window");
  const x = [
    {
      AssetId: 161,
      AssetName: "DIV 07",
      Data: {
        OperatingHours: 4,
        PlannedHours: 15597730.0,
        TheoreticalHours: 44.0,
        QuantityTracked: 8136,
        AcceptedQuantity: 8124,
        Availability: 1.48,
        Performance: 60.85,
        Quality: 1.85,
        CurrentOEE: 50.72,
        RejectedQuantity: 12,
      },
      Data1: {
        OperatingHours: 4,
        PlannedHours: 15597730.0,
        TheoreticalHours: 44.0,
        QuantityTracked: 8136,
        AcceptedQuantity: 8124,
        Availability: 1.48,
        Performance: 60.85,
        Quality: 1.85,
        Pre: 50.72,
        RejectedQuantity: 12,
      },
    },
  ];
  const [opList, setopList] = useState("");
  const [opList1, setopList1] = useState("");
  const optionList = ["OEE", "Availibility", "RejectedQuantity"];
  console.log("oplist", opList);
  const Dataeee = {
    OperatingHours: 13021478.0,
    PlannedHours: 15597730.0,
    TheoreticalHours: 7923432.0,
    QuantityTracked: 8136,
    AcceptedQuantity: 8124,
    Availability: 83.48,
    Performance: 60.85,
    Quality: 99.85,
    Prev: 50.72,
    RejectedQuantity: 12,
  };
  function onChangeValue(event) {
    setopList(event.target.value);
    console.log(event.target.value);
    switch (event.target.value) {
      case "OEE":
        console.log("selected oee");
        {
          const a = x.map((op) => op.Data);
          console.log(a);
        }
        break;
      case "Availibility":
        console.log("selected Availibility");

        break;
      case "RejectedQuantity":
        console.log("selected RejectedQuantity");

        break;

      default:
        break;
    }
  }
  function onChangeValue2(event) {
    switch (opList) {
      case "OEE":
        console.log("selected oee");
        <Text></Text>;
        break;
      case "Availibility":
        console.log("selected Availibility");

        break;
      case "RejectedQuantity":
        console.log("selected RejectedQuantity");

        break;

      default:
        break;
    }
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
        >
          <View style={{ width, height }}>
            <Text>Screen 1</Text>

            {/* <div>
              {Object.keys(Data).map((key, i) => (
                <p key={i}>
                  <span>Key Name: {key}</span>
                  <span>Value: {Data[key]}</span>
                </p>
              ))}
            </div> */}

            {x.map((op) => (
              <div>
                {Object.keys(op.Data).map((key, i) => (
                  <p key={i}>
                    <span>Keymmmmmm : {key}</span>
                    <span>Value: {op.Data[key]}</span>
                  </p>
                ))}
                {Object.keys(op.Data1).map((key, i) => (
                  <p key={i}>
                    <span>Keymmmmmm : {key}</span>
                    <span>Value: {op.Data1[key]}</span>
                  </p>
                ))}
              </div>
            ))}
          </View>
          <View style={{ width, height }}>
            <Text>Screen 2</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 3</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 4</Text>
          </View>
          <View style={{ width, height }}>
            <Text>Screen 5</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
  },
  checkbox: {
    margin: 8,
  },
  green: {
    color: "#00ff00",
  },
  red: {
    color: "#ff0000",
  },
});
