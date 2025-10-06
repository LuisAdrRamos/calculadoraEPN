import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FAB from "@/components/FAB";
import { Colors } from "@/constants/theme";

export default function CalculadoraEPN() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState("");
  const [operator, setOperator] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if ("0123456789.".includes(value)) {
      setCurrent((prev) =>
        prev === "0" && value !== "." ? value : prev + value
      );
    } else if (["+", "-", "x", "÷"].includes(value)) {
      setOperator(value);
      setPrevious(current);
      setCurrent("0");
    } else if (value === "=") {
      calculate();
    } else if (value === "C") {
      setCurrent("0");
      setPrevious("");
      setOperator(null);
    } else if (value === "+/-") {
      setCurrent((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
    } else if (value === "del") {
      setCurrent((prev) =>
        prev.length > 1 ? prev.slice(0, -1) : "0"
      );
    }
  };

  const calculate = () => {
    const num1 = parseFloat(previous);
    const num2 = parseFloat(current);
    if (isNaN(num1) || isNaN(num2)) return;

    let result = 0;
    switch (operator) {
      case "+": result = num1 + num2; break;
      case "-": result = num1 - num2; break;
      case "x": result = num1 * num2; break;
      case "÷": result = num2 === 0 ? NaN : num1 / num2; break;
    }
    setCurrent(result.toString());
    setOperator(null);
    setPrevious("");
  };

  const buttons = [
    ["C", "+/-", "del", "÷"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Display */}
      <View style={styles.display}>
        {previous && <Text style={styles.subDisplay}>{previous} {operator}</Text>}
        <Text style={styles.mainDisplay}>{current}</Text>
      </View>

      {/* Teclado */}
      <View style={styles.buttons}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((label) => (
              <FAB
                key={label}
                label={label}
                onPress={handlePress}
                flex={label === "0" ? 2 : 1}
                bg={
                  ["÷", "x", "-", "+", "="].includes(label)
                    ? Colors.orange
                    : ["C", "+/-", "del"].includes(label)
                      ? Colors.lightGray
                      : Colors.darkGray
                }
                color={
                  ["C", "+/-", "del"].includes(label)
                    ? "black"
                    : "white"
                }
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: "flex-end" },
  display: { paddingHorizontal: 24, marginBottom: 20, alignItems: "flex-end" },
  subDisplay: { color: Colors.textSecondary, fontSize: 32 },
  mainDisplay: { color: Colors.textPrimary, fontSize: 72, fontWeight: "300" },
  buttons: { paddingHorizontal: 8, paddingBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
});