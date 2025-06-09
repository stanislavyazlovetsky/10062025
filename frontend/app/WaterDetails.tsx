import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../constants/api";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#1E1E1E",
  backgroundGradientFrom: "#2A2A72",
  backgroundGradientTo: "#009FFD",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: () => "#fff",
  style: { borderRadius: 16 },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#ffd700",
  },
};

export default function WaterDetails({ navigation }) {
  const [data, setData] = useState([]);
  const [totalCups, setTotalCups] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/water-intake/week`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        const total = json.reduce((sum, day) => sum + day.cups, 0);
        setTotalCups(total);
      })
      .catch(() => {
        setData([]);
        setTotalCups(0);
      });
  }, []);

  const labels = data.map((d) => d.date.slice(5)); // MM-DD
  const cupsData = data.map((d) => d.cups);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Кнопка назад */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Water Intake This Week</Text>

        {data.length > 0 ? (
          <>
            <LineChart
              data={{ labels, datasets: [{ data: cupsData }] }}
              width={screenWidth * 0.9}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
            <Text style={styles.total}>Total Cups: {totalCups}</Text>
          </>
        ) : (
          <Text style={styles.noData}>No water intake data available.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#0e1013",
    flexGrow: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  card: {
    backgroundColor: "#1a1d24",
    borderRadius: 20,
    padding: 16,
    width: "95%",
    alignItems: "center",
    marginTop: 70, // щоб не перекриватися з кнопкою назад
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  chart: {
    borderRadius: 16,
  },
  total: {
    fontSize: 18,
    marginTop: 12,
    color: "#fff",
    fontWeight: "600",
  },
  noData: {
    fontSize: 16,
    color: "#aaa",
  },
});
