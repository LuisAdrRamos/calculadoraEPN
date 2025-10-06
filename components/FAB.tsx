import React, { memo } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/theme";

export interface FABProps {
  label: string;                // Texto que se muestra (número o símbolo)
  onPress: (value: string) => void; // Acción al presionar el botón
  size?: number;                // Tamaño del botón
  bg?: string;                  // Color de fondo
  color?: string;               // Color del texto
  flex?: number;                // Permite expandir el botón ("0" es más ancho)
  style?: ViewStyle;            // Estilo adicional
}

const FAB = memo(function FAB({
  label,
  onPress,
  size = 80,
  bg = Colors.darkGray,
  color = Colors.textPrimary,
  flex = 1,
  style,
}: FABProps) {
  const handlePress = () => {
    Haptics.selectionAsync();
    onPress(label);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.base,
        {
          backgroundColor: bg,
          width: size,
          height: size,
          borderRadius: size / 2,
          flex,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },
  label: {
    fontSize: 28,
    fontWeight: "500",
  },
});

export default FAB;