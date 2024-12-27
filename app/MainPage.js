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
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Button, DataTable } from "react-native-paper";
import Axios from "axios";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import React, { useState, useCallback, useEffect } from "react";
import { navigate } from "expo-router/build/global-state/routing";

export default function App() {
  const sessionauth = sessionStorage.getItem("SessionId");
  const custmoreCode = sessionStorage.getItem("customerCode");
  const plantCode = sessionStorage.getItem("plantCode");
  const appId = sessionStorage.getItem("appId");
  let sessionId = { Authorization: sessionauth };

  const [companyList, setcompanyList] = useState([]);
  const company = sessionStorage.getItem("CompanyName");
  const [modalVisible, setModalVisible] = useState(false);
  const [weekmodalVisible, setweekModalVisible] = useState(false);
  const [graphData, setgraphData] = useState([]);
  const [graphData1, setgraphData1] = useState([]);
  const [machName, setmachineName] = useState("");
  const [CurrOEE, setcurOEE] = useState("");
  const [PrevOEE, setprevOEE] = useState("");
  const [machNamelable, setmachineNamelable] = useState("");
  const [CurrOEElable, setcurOEElable] = useState("");
  const [PrevOEElable, setprevOEElable] = useState("");
  const [val, setval] = useState("");
  const [kpiParameters, setkpiParameters] = useState([]);
  const [currValue, setCurrValue] = useState("");
  const [PrevValue, setprevValue] = useState("");
  const [kpiObjectId, setKpiObjectId] = useState("OEE");
  const [map, setMap] = useState(new Map());
  let headers2 = { Authorization: sessionStorage.getItem("SessionId") };
  useEffect(() => {
    Axios.get(
      "http://192.168.1.15:9020/api/customer/service?customerCode=" +
        custmoreCode +
        "&plantCode=" +
        plantCode +
        "&serviceName=LWMessenger&appId=" +
        appId +
        "&appSecret=A0B035A1-DFE9-40D9-A17C-CE55BC1A9436",
      {
        headers: headers2,
      }
    ).then((res) => {
      sessionStorage.setItem("serviceUrl", res.data[0].Url);
      let ServiceUrl = sessionStorage.getItem("serviceUrl");
      Axios.get(
        ServiceUrl +
          "rest/leanworks/session?AppId=WebClients&AppSecret=FD075B55-CA16-406B-8BC7-DD5A1FA1E49A"
      ).then((res1) => {
        sessionStorage.setItem("messengerSessionId", res1.data);
        const Messengersessionauth = sessionStorage.getItem("messengerSessionId");
        let headers1 = { Authorization: Messengersessionauth };

        Axios.get(
          ServiceUrl +
            "rest/leanworks/CEOMobileApp/OEEDataComparison?assetType=11&assetId=1&reportPeriod=Current Month&plantId=3",
          {
            headers: headers1,
          }
        ).then((res2) => {
          let a = res2.data;
          let cmpList = [];
          for (let i in a) {
            cmpList.push(a[i]);
          }
          setcompanyList(cmpList);
          Axios.get(
            "http://192.168.1.15:9020/api/customer/appDetails?customerCode=" +
              custmoreCode +
              "&plantCode=" +
              plantCode +
              "&appId=" +
              appId
          ).then((res3) => {
            sessionStorage.setItem("portalAppSecret", res3.data);

            Axios.get(ServiceUrl + "rest/leanworks/CEODashboard/Assets", {
              headers: headers1,
            }).then((res4) => {});
            Axios.get(ServiceUrl + "rest/leanworks/CEODashboard/ReportParameters", {
              headers: headers1,
            }).then((res5) => {
              let m = map;

              for (let i in res5.data) {
                m.set(res5.data[i].ParameterId, res5.data[i].ParameterName);
              }
              setMap(m);

              setkpiParameters(res5.data);
            });
            Axios.get(
              ServiceUrl +
                "rest/leanworks/CEOMobileApp/OEEDataComparison?assetType=11&assetId=1&reportPeriod=Current Day&plantId=0",
              {
                headers: headers1,
              }
            ).then((res6) => {});
          });
        });
      });
    });
  }, []);

  function graphModal() {}

  const setvalue = (e) => {
    setcurOEE(e.target.value);
    console.log(CurrOEE);
  };

  return (
    <View style={{ backgroundColor: "#121111", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#0000",
          width: 375,
          height: 150,
          marginTop: 5,
          marginLeft: 20,
          marginRight: 50,
        }}
      >
        <Image style={styles.image} source={require("../assets/Leanworxlogo1.png")} />

        <Text style={{ fontSize: 20, color: "#f0fcfc", marginLeft: 120, fontFamily: "bold" }}>
          {company}
        </Text>
        <View style={styles.flex1}>
          <Text style={{ fontSize: 15, color: "#f0fcfc", marginLeft: 50, fontFamily: "bold" }}>
            {CurrOEElable} {CurrOEE}
          </Text>{" "}
          <Text style={{ fontSize: 15, color: "#f0fcfc", marginLeft: 30, fontFamily: "bold" }}>
            {PrevOEElable} {PrevOEE}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#373738",
          width: 375,
          height: 700,
          marginTop: 10,
          marginLeft: 20,
          marginRight: 50,
        }}
      >
        <ScrollView>
          <DataTable>
            <DataTable.Header style={{ backgroundColor: "#fcf9e6" }}>
              <DataTable.Title textStyle={{ color: "#030000", fontSize: 20 }}>
                plants
              </DataTable.Title>

              <DataTable.Title
                textStyle={{ color: "#030000", fontSize: 20 }}
                style={{ marginRight: 100 }}
              >
                <select
                  style={{
                    backgroundColor: "#fcf9e6",
                    width: 120,
                    height: 20,
                    marginTop: 4,
                    borderColor: "#fcf9e6",
                    fontSize: 14,
                  }}
                  onChange={(e) => {
                    let val = "";
                    val = e.target.value;
                    console.log(val, "kpiObj");
                    setKpiObjectId(val);
                  }}
                >
                  {kpiParameters.map((k) => (
                    <option value={k.ParameterName}>{k.ParameterName}</option>
                  ))}
                </select>
                {/* <select
                  style={{
                    backgroundColor: "#fcf9e6",
                    width: 120,
                    height: 20,
                    marginTop: 4,
                    borderColor: "#fcf9e6",
                    fontSize: 14,
                  }}
                  name="OEE"
                  defaultValue="OEE"
                  onChange={(e) => setvalue(e, e.target.value)}
                >
                  {kpiParameters.map(
                    (x) => (
                      // Object.keys(x.CurrentData).map((key) => (
                      <option>{x.ParameterName}</option>
                    )
                    // ))
                  )}
                </select> */}
              </DataTable.Title>
            </DataTable.Header>{" "}
            {companyList.map((x) => (
              <DataTable.Row style={{ color: "white" }}>
                <DataTable.Cell>
                  <TouchableOpacity
                    onPress={({}) => {
                      setcurOEElable("Current OEE : ");
                      setprevOEElable("Previous OEE : ");
                      setmachineNamelable("Company name : ");
                    }}
                  >
                    <TextInput
                      style={{ color: "white" }}
                      pointerEvents="none"
                      value={x.AssetName}
                    />
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={{}} onChange={setvalue}>
                  {" "}
                  <View style={styles.flex2}>
                    {kpiObjectId === -1 && <td></td>}

                    {kpiObjectId === "Downtime" && (
                      <Text
                        style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}
                        onChange={setvalue}
                      >
                        {x.CurrentData.Downtime === undefined ? "No Data" : x.CurrentData.Downtime}
                      </Text>
                    )}
                    {kpiObjectId === "Downtime" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.Downtime === undefined
                          ? "No Data"
                          : x.PreviousData.Downtime}
                      </Text>
                    )}
                    {kpiObjectId === "OEE" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.OEE === undefined ? "No Data" : x.CurrentData.OEE}
                      </Text>
                    )}
                    {kpiObjectId === "OEE" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.OEE === undefined ? "No Data" : x.PreviousData.OEE}
                      </Text>
                    )}
                    {kpiObjectId === "Availability" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.Availability === undefined
                          ? "No Data"
                          : x.CurrentData.Availability}
                      </Text>
                    )}
                    {kpiObjectId === "Availability" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.Availability === undefined
                          ? "No Data"
                          : x.PreviousData.Availability}
                      </Text>
                    )}
                    {kpiObjectId === "Performance" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.Performance === undefined
                          ? "No Data"
                          : x.CurrentData.Performance}
                      </Text>
                    )}
                    {kpiObjectId === "Performance" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.Performance === undefined
                          ? "No Data"
                          : x.PreviousData.Performance}
                      </Text>
                    )}
                    {kpiObjectId === "Quality" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.Quality === undefined ? "No Data" : x.CurrentData.Quality}
                      </Text>
                    )}
                    {kpiObjectId === "Quality" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.Quality === undefined ? "No Data" : x.PreviousData.Quality}
                      </Text>
                    )}
                    {kpiObjectId === "ProductionQuantity" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.QuantityTracked === undefined
                          ? "No Data"
                          : x.CurrentData.QuantityTracked}
                      </Text>
                    )}
                    {kpiObjectId === "ProductionQuantity" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.QuantityTracked === undefined
                          ? "No Data"
                          : x.PreviousData.QuantityTracked}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionQuantity" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.RejectionQuantity === undefined
                          ? "No Data"
                          : x.CurrentData.RejectionQuantity}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionQuantity" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.RejectionQuantity === undefined
                          ? "No Data"
                          : x.PreviousData.RejectionQuantity}
                      </Text>
                    )}
                    {kpiObjectId === "DowntimeRevenueLoss" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.DowntimeRevenueLoss === undefined &&
                        x.CurrentData.DowntimeRevenueLoss > x.PreviousData.DowntimeRevenueLoss
                          ? "No Data"
                          : x.CurrentData.DowntimeRevenueLoss}
                      </Text>
                    )}
                    {kpiObjectId === "DowntimeRevenueLoss" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.DowntimeRevenueLoss === undefined
                          ? "No Data"
                          : x.PreviousData.DowntimeRevenueLoss}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionRevenueLoss" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.RejectionRevenueLoss === undefined
                          ? "No Data"
                          : x.CurrentData.RejectionRevenueLoss}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionRevenueLoss" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.RejectionRevenueLoss === undefined
                          ? "No Data"
                          : x.PreviousData.RejectionRevenueLoss}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionRevenueLoss" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.RejectionRevenueLoss === undefined
                          ? "No Data"
                          : x.CurrentData.RejectionRevenueLoss}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionRevenueLoss" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.RejectionRevenueLoss === undefined
                          ? "No Data"
                          : x.PreviousData.RejectionRevenueLoss}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionPercentage" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.RejectionPercentage === undefined
                          ? "No Data"
                          : x.CurrentData.RejectionPercentage}
                      </Text>
                    )}
                    {kpiObjectId === "RejectionPercentage" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.RejectionPercentage === undefined
                          ? "No Data"
                          : x.PreviousData.RejectionPercentage}
                      </Text>
                    )}
                    {kpiObjectId === "SpindleUtilization" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.SpindleUtilization === undefined
                          ? "No Data"
                          : x.CurrentData.SpindleUtilization}
                      </Text>
                    )}
                    {kpiObjectId === "SpindleUtilization" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.SpindleUtilization === undefined
                          ? "No Data"
                          : x.PreviousData.SpindleUtilization}
                      </Text>
                    )}
                    {kpiObjectId === "TEEP" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.TEEP === undefined ? "No Data" : x.CurrentData.TEEP}
                      </Text>
                    )}
                    {kpiObjectId === "TEEP" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.TEEP === undefined ? "No Data" : x.PreviousData.TEEP}
                      </Text>
                    )}
                    {kpiObjectId === "DowntimePercentage" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.CurrentData.DowntimePercentage === undefined
                          ? "No Data"
                          : x.CurrentData.DowntimePercentage}
                      </Text>
                    )}
                    {kpiObjectId === "DowntimePercentage" && (
                      <Text style={{ color: "#fff", marginBottom: 10, marginLeft: 30 }}>
                        {x.PreviousData.DowntimePercentage === undefined
                          ? "No Data"
                          : x.PreviousData.DowntimePercentage}
                      </Text>
                    )}
                  </View>
                </DataTable.Cell>

                <DataTable.Cell style={{ color: "white", marginBottom: 10, marginRight: 50 }}>
                  {/* <LineChart
       onDataPointClick={({}) => {
         setgraphData(x.CurrentData.OEE);
         setgraphData1(x.PreviousData.OEE);
         navigation.navigate("machine");
       }}
       data={{
         datasets: [
           {
             data: x.CurrentData.OEE,
           },
           {
             data: x.PreviousData.OEE,
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
     /> */}
                </DataTable.Cell>

                <Modal
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
                  <View style={styles.flex1}>
                    <Button onPress={() => setweekModalVisible(true)}>1w</Button>
                    <Modal
                      animationType="none"
                      transparent={false}
                      visible={weekmodalVisible}
                      onRequestClose={() => setweekModalVisible(false)}
                      style={{
                        backgroundColor: "white",
                        margin: 20,
                      }}
                    >
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
                      />
                    </Modal>
                    <Button>!M</Button>
                  </View>
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
                    width={500}
                    height={500}
                    chartConfig={{
                      backgroundColor: "#373738",
                      backgroundGradientFrom: "#373738",
                      backgroundGradientTo: "#373738",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255,0,0, ${opacity})`,
                    }}
                  />{" "}
                </Modal>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </View>
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
    backgroundColor: "red",
  },
  green: {
    backgroundColor: "green",
  },
});
