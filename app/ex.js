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

export default function Ex() {
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
  const [prevValue, setPrevValue] = useState("");
  const [kpiObjectId, setKpiObjectId] = useState(-1);

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
          console.log(res2.data, "companyList ex");
          setcompanyList(res2.data);
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
            }).then((res4) => {
              // console.log("Api to get the assets", res4.data);
            });
            Axios.get(ServiceUrl + "rest/leanworks/CEODashboard/ReportParameters", {
              headers: headers1,
            }).then((res5) => {
              let m = map;
              console.log(res5.data, "kpi");
              for (let i in res5.data) {
                m.set(res5.data[i].ParameterId, res5.data[i].ParameterName);
              }
              setMap(m);
              console.log(m, "map");
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
    let val = e.target.value;
    console.log(e.target.value, "ad list");
    if (val == "OEE") {
      let cmpList = companyList;
      cmpList = parseFloat(cmpList.map((x) => x.PreviousData.OEE)).toFixed(2);
      setPrevValue(cmpList);
    } else if (val == "Availability") {
      let cmpCurrList = companyList;
      let cmpPrevList = companyList;
      cmpCurrList = cmpCurrList.map((x) => x.CurrentData.Availability);
      cmpPrevList = cmpPrevList.map((x) => x.CurrentData.Availability);
      setCurrValue(cmpCurrList);
      setPrevValue(cmpPrevList);
    }
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
          <table>
            <thead>
              <tr>
                <th>Plants</th>
                <th>
                  <select
                    defaultValue={-1}
                    onChange={(e) => {
                      let val = +e.target.value;
                      setKpiObjectId(val);
                    }}
                  >
                    <option value={-1}>None</option>
                    {kpiParameters.map((k) => (
                      <option value={k.ParameterId}>{k.ParameterName}</option>
                    ))}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {companyList.map((c) => (
                <tr>
                  <td>{c.AssetName}</td>
                  {kpiObjectId === -1 && <td></td>}

                  {kpiObjectId === 0 && (
                    <td>
                      {c.CurrentData.Downtime === undefined ? "No Data" : c.CurrentData.Downtime}
                    </td>
                  )}
                  {kpiObjectId === 1 && (
                    <td>
                      {c.CurrentData.Availability === undefined
                        ? "No Data"
                        : c.CurrentData.Availability}
                    </td>
                  )}
                  {kpiObjectId === 2 && <td>{c.CurrentData.Performance}</td>}
                </tr>
              ))}
            </tbody>
          </table>
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
    color: "red",
  },
  green: {
    color: "green",
  },
});
