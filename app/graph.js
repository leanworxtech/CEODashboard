import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
  BackHandler,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Button } from "react-native-paper";
const onBackPress = (callback) => {
  BackHandler.addEventListener("hardwareBackPress", callback);
  return () => {
    BackHandler.removeEventListener("hardwareBackPress", callback);
  };
};
function handleBackPress() {
  navigation.navigate("MainPage");
  return true;
}
const screenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 860;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8],
};
export default function machine() {
  return (
    <View style={{ backgroundColor: "#121111", flex: 1 }}>
      <StatusBar backgroundColor="#750056" barStyle="light-content" />
      <Button
        style={styles.CardDetail2}
        onPress={handleBackPress}
        icon="arrow-left"
        theme={{ colors: { primary: "white" } }}
      ></Button>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <View style={styles.CardDetail}>
          <TouchableOpacity
            style={styles.CardDetail1}
            onPress={() => {
              this.scroll.scrollTo({ x: 0 });
            }}
          >
            <View style={styles.detailContent}>
              <Text style={styles.title}>week</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardDetail1}
            onPress={() => this.scroll.scrollTo({ x: CARD_WIDTH })}
          >
            <View style={styles.detailContent}>
              <Text style={styles.title}>month</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CardDetail1}
            onPress={() => this.scroll.scrollTo({ x: CARD_WIDTH * 2 })}
          >
            <View style={styles.detailContent}>
              <Text style={styles.title}>year</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Animated.ScrollView
          ref={(node) => (this.scroll = node)}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          pagingEnabled
          snapToInterval={CARD_WIDTH}
          snapToAlignment="center"
        >
          <View style={styles.card}>
            <View>
              <Text>1 week</Text>
              <LineChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={420}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View>
              <Text>1 month</Text>
              <LineChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={420}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View>
              <Text>1 year</Text>
              <LineChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={420}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
        </Animated.ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
  },
  cardContainer: {
    backgroundColor: "black",
    marginTop: 60,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  scrollView: {
    // position: "absolute",
    top: 60,
    // bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    // padding: 10,
    marginTop: 50,
    elevation: 3,
    backgroundColor: "#0000",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 15,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  selectNow: {
    width: "80%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSelect: {
    fontSize: 16,
    fontWeight: "bold",
  },
  CardDetail: {
    alignSelf: "center",
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    // backgroundColor: "#009387",
  },
  CardDetail1: {
    // alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000",
    borderRadius: 20,
    marginHorizontal: 5,
    width: "35%",
    marginBottom: 100,
  },
  CardDetail2: {
    // alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    marginHorizontal: 5,
    width: "10%",
    height: 30,
    marginTop: 20,
    marginRight: 80,
  },
  detailContent: {
    margin: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: "#fff",
  },
});
