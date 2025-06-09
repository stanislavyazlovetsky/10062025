import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      {/* Основний вміст */}
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {/* Profile avatar + name */}
        <View style={styles.profileSection}>
          <Ionicons name="person-circle-outline" size={60} color="white" />
          <Text style={styles.userName}>Your name</Text>
        </View>

        {/* Menu block */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="settings" size={20} color="white" />
            <Text style={styles.menuText}>FAQ/Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="book-outline" size={20} color="white" />
            <Text style={styles.menuText}>Manual</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, { marginLeft: 24 }]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Винесений Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("MainApp") }>
          <MaterialIcons name="favorite" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Device") }>
          <FontAwesome5 name="hand-paper" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile") }>
          <Ionicons name="person-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0e1013",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  userName: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "600",
  },
  menuCard: {
    backgroundColor: "#1a1d24",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  menuText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
