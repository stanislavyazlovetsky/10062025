import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../constants/api";

export default function MainApp() {
  const navigation = useNavigation();

  const [darkTheme, setDarkTheme] = useState(false);
  const [waterCups, setWaterCups] = useState(0);
  const [waterDate, setWaterDate] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [bloodOxygen, setBloodOxygen] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuOpacity = useState(new Animated.Value(0))[0];

  const formatDate = (date) => date.toISOString().split("T")[0];

  useEffect(() => {
    const todayStr = formatDate(new Date());
    if (waterDate !== todayStr) {
      setWaterCups(0);
      setWaterDate(todayStr);
    }
  }, [waterDate]);

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    const timer = setTimeout(() => {
      setWaterCups(0);
      setWaterDate(formatDate(new Date()));
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [waterDate]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuOpacity, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fetchLatestHeartRate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/heart-rate/latest`);
      if (res.ok) {
        const data = await res.json();
        setHeartRate(data.pulse);
      } else setHeartRate(null);
    } catch {
      setHeartRate(null);
    }
  };

  const fetchLatestBloodOxygen = async () => {
    try {
      const res = await fetch(`${BASE_URL}/blood-oxygen/latest`);
      if (res.ok) {
        const data = await res.json();
        setBloodOxygen(data.oxygen_level);
      } else setBloodOxygen(null);
    } catch {
      setBloodOxygen(null);
    }
  };

  useEffect(() => {
    fetchLatestHeartRate();
    fetchLatestBloodOxygen();
    const interval = setInterval(() => {
      fetchLatestHeartRate();
      fetchLatestBloodOxygen();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const incrementWater = () => setWaterCups((c) => c + 1);
  const decrementWater = () => setWaterCups((c) => (c > 0 ? c - 1 : 0));

  return (
    <View style={[styles.container, { backgroundColor: "#0e1013" }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.mainTitle}>Health</Text>

        {/* Top Card: Heart & Saturation */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.healthItem}>
              <Text style={styles.itemLabel}>Heart rate {'>'}</Text>
              <Text style={styles.itemValue}>
                {heartRate !== null ? heartRate : "-"}
              </Text>
            </View>
            <View style={styles.healthItem}>
              <Text style={styles.itemLabel}>Saturation {'>'}</Text>
              <Text style={styles.itemValue}>
                {bloodOxygen !== null ? `${bloodOxygen}%` : "-"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate("Detalinfo")}
          >
            <Text style={styles.detailsText}>🟡 Details</Text>
          </TouchableOpacity>
        </View>

        {/* Water Card */}
        <Text style={styles.reminderTitle}>Water</Text>
        <View style={styles.card}>
          <View style={styles.healthItem}>
            <Text style={styles.itemLabel}>Water intake</Text>
            <View style={styles.waterRow}>
              <TouchableOpacity style={styles.waterBtn} onPress={decrementWater}>
                <Text style={styles.waterBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.itemValue}>{waterCups}</Text>
              <TouchableOpacity style={styles.waterBtn} onPress={incrementWater}>
                <Text style={styles.waterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.dateText}>{waterDate}</Text>
            <Text style={styles.reminderText}>
              You need to drink {Math.max(0, 8 - waterCups)} more cups today
            </Text>
          </View>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate("WaterDetails")}
          >
            <Text style={styles.detailsText}>🟡 Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <MaterialIcons name="favorite" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Device")}>
          <FontAwesome5 name="hand-paper" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1a1d24",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  healthItem: {
    alignItems: "center",
    flex: 1,
  },
  itemLabel: {
    color: "#ccc",
    fontSize: 15,
    marginBottom: 6,
  },
  itemValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  waterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 4,
  },
  waterBtn: {
    backgroundColor: "#f9c94b",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 12,
    borderRadius: 6,
  },
  waterBtnText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  dateText: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  detailsButton: {
    backgroundColor: "#2e2e2e",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  detailsText: {
    color: "#f9c94b",
    fontWeight: "600",
    fontSize: 16,
  },
  reminderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",  // <- додано для центрування заголовку
  },
  reminderText: {
    color: "#fff",
    fontSize: 15,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: "#1a1d24",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
