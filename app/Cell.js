import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Modal,
  Linking,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { Button, DataTable } from "react-native-paper";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React, { useState, useCallback } from "react";
import { navigate } from "expo-router/build/global-state/routing";

export default function Cell() {
  const machineName = [
    {
      AssetId: 47,
      AssetName: "DIV 10",
      Data: {
        OperatingHours: 72487191.0,
        PlannedHours: 95486645.0,
        TheoreticalHours: 68029574.0,
        QuantityTracked: 187169,
        AcceptedQuantity: 187070,
        Availability: 75.91,
        Performance: 93.85,
        Quality: 99.95,
        CurrentOEE: 71.21,
        PrevOEE: 60.0,
        RejectedQuantity: 99,
      },
    },
    {
      AssetId: 48,
      AssetName: "DIV 01",
      Data: {
        OperatingHours: 13078920.0,
        PlannedHours: 14187600.0,
        TheoreticalHours: 7491918.0,
        QuantityTracked: 47889,
        AcceptedQuantity: 47889,
        Availability: 92.19,
        Performance: 57.28,
        Quality: 100.0,
        CurrentOEE: 52.81,
        PrevOEE: 30.04,
        RejectedQuantity: 0,
      },
    },
    {
      AssetId: 49,
      AssetName: "Friction Welding",
      Data: {
        OperatingHours: 18679075.0,
        PlannedHours: 21329397.0,
        TheoreticalHours: 8988680.0,
        QuantityTracked: 31539,
        AcceptedQuantity: 31538,
        Availability: 87.57,
        Performance: 48.12,
        Quality: 100.0,
        CurrentOEE: 42.14,
        PrevOEE: 67.22,
        RejectedQuantity: 1,
      },
    },
    {
      AssetId: 50,
      AssetName: "DIV 02",
      Data: {
        OperatingHours: 40377944.0,
        PlannedHours: 42136639.0,
        TheoreticalHours: 25618684.0,
        QuantityTracked: 65014,
        AcceptedQuantity: 64982,
        Availability: 95.83,
        Performance: 63.45,
        Quality: 99.95,
        CurrentOEE: 60.77,
        PrevOEE: 49.78,
        RejectedQuantity: 32,
      },
    },
    {
      AssetId: 51,
      AssetName: "DIV 03",
      Data: {
        OperatingHours: 44079668.0,
        PlannedHours: 46119134.0,
        TheoreticalHours: 25000059.0,
        QuantityTracked: 123493,
        AcceptedQuantity: 123415,
        Availability: 95.58,
        Performance: 56.72,
        Quality: 99.94,
        CurrentOEE: 54.18,
        PrevOEE: 64.21,
        RejectedQuantity: 78,
      },
    },
    {
      AssetId: 52,
      AssetName: "DIV 05",
      Data: {
        OperatingHours: 41637940.0,
        PlannedHours: 45029282.0,
        TheoreticalHours: 14858935.0,
        QuantityTracked: 163610,
        AcceptedQuantity: 163607,
        Availability: 92.47,
        Performance: 35.69,
        Quality: 100.0,
        CurrentOEE: 33.0,
        PrevOEE: 33.0,
        RejectedQuantity: 3,
      },
    },
    {
      AssetId: 53,
      AssetName: "DIV 08",
      Data: {
        OperatingHours: 3770892.0,
        PlannedHours: 3995981.0,
        TheoreticalHours: 2247719.0,
        QuantityTracked: 168138,
        AcceptedQuantity: 167629,
        Availability: 94.37,
        Performance: 59.61,
        Quality: 99.7,
        CurrentOEE: 56.09,
        PrevOEE: 60.03,
        RejectedQuantity: 509,
      },
    },

    {
      AssetId: 83,
      AssetName: "DIV 14",
      Data: {
        OperatingHours: 24218654.0,
        PlannedHours: 24218654.0,
        TheoreticalHours: 12322817.0,
        QuantityTracked: 34486,
        AcceptedQuantity: 34479,
        Availability: 100.0,
        Performance: 50.88,
        Quality: 99.98,
        CurrentOEE: 50.87,
        PrevOEE: 60.09,
        RejectedQuantity: 7,
      },
    },
    {
      AssetId: 161,
      AssetName: "DIV 07",
      Data: {
        OperatingHours: 13021478.0,
        PlannedHours: 15597730.0,
        TheoreticalHours: 7923432.0,
        QuantityTracked: 8136,
        AcceptedQuantity: 8124,
        Availability: 83.48,
        Performance: 60.85,
        Quality: 99.85,
        CurrentOEE: 50.72,
        PrevOEE: 50.06,
        RejectedQuantity: 12,
      },
    },
  ];
  function graphModal() {
    console.log("data, index");
  }
  const arr = ["OperatingHours", "a", "f", "s"];
  const [modalVisible, setModalVisible] = useState(false);
  const [graphData, setgraphData] = useState([]);
  const [graphData1, setgraphData1] = useState([]);
  const [machName, setmachineName] = useState("");
  const [CurrOEE, setcurOEE] = useState("");
  const [PrevOEE, setprevOEE] = useState("");
  const [machNamelable, setmachineNamelable] = useState("");
  const [CurrOEElable, setcurOEElable] = useState("");
  const [PrevOEElable, setprevOEElable] = useState("");

  return (
    <View style={{ backgroundColor: "#121111", flex: 1 }}>
      <Text style={{ color: "white" }}>{machName}</Text>
      <select name="pallet number">
        {arr.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      <ScrollView>
        <DataTable style={{ color: "white" }}>
          {machineName.map((x) => (
            <DataTable.Row style={{ color: "white" }}>
              <DataTable.Cell>
                <TouchableOpacity
                  onPress={({}) => {
                    setcurOEElable("Current OEE : ");
                    setprevOEElable("Previous OEE : ");
                    setmachineNamelable("Machine name : ");
                    setmachineName(x.AssetName);
                    setcurOEE(x.Data.CurrentOEE);
                    setprevOEE(x.Data.PrevOEE);
                  }}
                >
                  <TextInput style={{ color: "white" }} pointerEvents="none" value={x.AssetName} />
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell style={{}}>
                {" "}
                <View style={styles.flex2}>
                  <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                    {x.Data.CurrentOEE}
                  </Text>
                  <Text style={{ marginBottom: 10, marginLeft: 30, color: "white" }}>
                    {x.Data.PrevOEE}
                  </Text>
                  <TextInput
                    onChangeText={(text) =>
                      onChange(x.Data.CurrentOEE >= x.Data.PrevOEE ? styles.green : styles.red)
                    }
                  />
                </View>
              </DataTable.Cell>
              {/* <DataTable.Cell style={{ color: "white", marginBottom: 10, marginRight: 50 }}>
                  <LineChart
                    onDataPointClick={({}) => {
                      setgraphData(x.data);
                      setgraphData1(x.data1);
                      setModalVisible(true);
                    }}
                    data={{
                      datasets: [
                        {
                          data: x.data,
                        },
                        {
                          data: x.data1,
                        },
                      ],
                    }}
                    width={150} // from react-native
                    height={80}
                    //yAxisLabel="$"
                    //yAxisSuffix="k"
                    // yAxisInterval={15} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#373738",
                      backgroundGradientFrom: "#373738",
                      backgroundGradientTo: "#373738",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(55,55,56, ${opacity})`,
                    }}

                    // bezier
                  />
                </DataTable.Cell> */}

              {/* <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                  style={{
                    backgroundColor: "white",
                    margin: 20,
                  }}
                >
                  {" "}
                  <Button
                    onPress={() => setModalVisible(false)}
                    icon="close"
                    height={20}
                    style={{
                      marginTop: 30,
                      marginLeft: 300,
                      marginBottom: 40,
                      width: 15,
                      height: 15,
                    }}
                  ></Button>
                  <LineChart
                    data={{
                      datasets: [
                        {
                          data: graphData,
                        },
                        {
                          data: graphData1,
                        },
                      ],
                    }}
                    width={500} // from react-native
                    height={500}
                    //yAxisLabel="$"
                    //yAxisSuffix="k"
                    // yAxisInterval={15} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#373738",
                      backgroundGradientFrom: "#373738",
                      backgroundGradientTo: "#373738",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255,0,0, ${opacity})`,
                    }}

                    // bezier
                  />{" "}
                </Modal> */}
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <Button>downtime</Button>
      <Button>Availability</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flex1: {
    margin: 10,
    flexDirection: "row",
  },
  flex2: {
    margin: 10,
    flexDirection: "column",
  },
  graph: {
    marginRight: 0,
    stroke: "orange",
    strokeWidth: 2.5,
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
  image: {
    height: 50,
    width: 200,
    margin: 10,
    padding: 5,
    marginLeft: 80,
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
});
