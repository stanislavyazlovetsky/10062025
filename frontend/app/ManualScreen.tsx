import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

export default function ManualScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      {/* Назад */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      {/* Заголовок */}
      <Text style={styles.title}>Інструкція користувача</Text>

      {/* Основний вміст */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.text}>
          <Text style={styles.subtitle}>Перший запуск:{"\n"}</Text>
          - Запустіть браслет (приєднайте кабель живлення){"\n"}
          - Увімкніть Bluetooth на смартфоні{"\n"}
          - Натисніть “Додати пристрій” → оберіть “HealthBand 1.0” зі списку{"\n"}
          - Підтвердьте з’єднання{"\n\n"}

          <Text style={styles.subtitle}>Головне меню:{"\n"}</Text>
          - “Download report” – формування звіту{"\n"}
          - “+” та “-” – введення кількості води (по 250мл){"\n"}
          - “details” (1 блок) – графіки пульсу і сатурації{"\n"}
          - “details” (2 блок) – графік води за тиждень{"\n\n"}

          <Text style={styles.subtitle}>Функціонал:{"\n"}</Text>
          - Детекція падіння (автосповіщення){"\n"}
          - Моніторинг пульсу та сатурації{"\n"}
          - Push-сповіщення користувачу та опікуну{"\n\n"}

          <Text style={styles.subtitle}>Зарядка та енергозбереження:{"\n"}</Text>
          - Заряджання при жовтому/червоному індикаторі в меню “Device”{"\n"}
          - При неактивності браслет переходить у сплячий режим
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0e1013",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    color: "white",
    fontSize: 16,
    marginLeft: 6,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  scroll: {
    paddingBottom: 40,
  },
  text: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontWeight: "bold",
    color: "#99ccff",
  },
});
