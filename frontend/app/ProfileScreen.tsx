import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import axios from "axios";
import { BASE_URL } from "../constants/api";  // переконайся, що там правильно вказаний URL

export default function ProfileScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Your name");

  useEffect(() => {
    const fetchLatestName = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile-settings/latest`);
        if (response.data && response.data.name) {
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error("Помилка при отриманні імені:", error);
      }
    };

    fetchLatestName();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Підтвердження виходу",
      "Ви дійсно хочете вийти?",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Вийти",
          onPress: () => {
            setIsLoggedIn(false);  // переключаємося на Login стек
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleFAQ = () => {
    const email = "healthband12@gmail.com";
    const subject = "Запит до служби підтримки HealthBand";
    const body = "Будь ласка, опишіть вашу проблему або запит:";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch((err) => {
      console.error("Не вдалося відкрити поштовий клієнт:", err);
      Alert.alert("Помилка", "Не вдалося відкрити поштовий застосунок.");
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {/* Avatar + Name */}
        <View style={styles.profileSection}>
          <Ionicons name="person-circle-outline" size={60} color="white" />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Menu Card */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={handleFAQ}>
            <Image source={require("../assets/images/faq.png")} style={styles.icon} />
            <Text style={styles.menuText}>FAQ / Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Manual")}>
            <Image source={require("../assets/images/user-guide.png")} style={styles.icon} />
            <Text style={styles.menuText}>Manual</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Image source={require('../assets/images/logout.png')} style={styles.icon} />
            <Text style={styles.menuText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("MainApp")}>
          <MaterialIcons name="favorite" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Device")}>
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
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
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
