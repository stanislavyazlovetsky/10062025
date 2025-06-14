import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DeviceScreen() {
  const navigation = useNavigation();

  const [devices, setDevices] = useState([
    { id: 1, name: "HealthBand v1.0" }
  ]);

  const handleAddDevice = () => {
    const newId = devices.length + 1;
    setDevices([...devices, { id: newId, name: `HealthBand v${newId}.0` }]);
  };

  const handleDisconnect = (id: number) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {devices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <Text style={styles.deviceName}>{device.name}</Text>

            <View style={styles.batteryRow}>
              <Ionicons name="battery-full" size={24} color="#4ade80" />
              <Text style={styles.batteryText}>Battery</Text>
              <Text style={styles.batteryPercent}>100%</Text>
            </View>

            <TouchableOpacity
              style={styles.disconnectBtn}
              onPress={() => handleDisconnect(device.id)}
            >
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={handleAddDevice}>
          <Text style={styles.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("MainApp")}>
          <MaterialIcons name="favorite" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="hand-paper" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e1013",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  deviceCard: {
    backgroundColor: "#1a1d24",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    marginTop: 15,
  },
  deviceName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  batteryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  batteryText: {
    color: "#fff",
    fontSize: 16,
  },
  batteryPercent: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disconnectBtn: {
    backgroundColor: "#f9c94b",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 12,
  },
  addBtn: {
    backgroundColor: "#f9c94b",
    paddingVertical: 8,
    marginTop: 15,
    paddingHorizontal: 40,
    width: 130,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
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
