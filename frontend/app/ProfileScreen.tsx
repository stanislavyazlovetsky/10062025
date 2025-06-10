import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();

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

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {/* Avatar + Name */}
        <View style={styles.profileSection}>
          <Ionicons name="person-circle-outline" size={60} color="white" />
          <Text style={styles.userName}>Your name</Text>
        </View>

        {/* Menu Card */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../assets/images/faq.png')} style={styles.icon} />
            <Text style={styles.menuText}>FAQ / Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../assets/images/user-guide.png')} style={styles.icon} />
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
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
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
