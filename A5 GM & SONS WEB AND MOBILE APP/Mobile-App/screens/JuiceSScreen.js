import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { featuredJuices } from "../constants";
import { themeColors } from "../theme";

export default function JuicesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {featuredJuices.map((juice, index) => (
          <View key={index} style={{ margin: 10 }}>
            <Image source={juice.image} style={{ width: "100%", height: 200, borderRadius: 10 }} />
            <Text style={{ color: themeColors.text, fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
              {juice.name}
            </Text>
            <Text style={{ color: themeColors.text, fontSize: 16, marginVertical: 5 }}>
              {juice.desc}
            </Text>
            <Text style={{ color: themeColors.text, fontSize: 16 }}>Price: {juice.price} PKR</Text>
            <TouchableOpacity
              style={{
                backgroundColor: themeColors.primary,
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
