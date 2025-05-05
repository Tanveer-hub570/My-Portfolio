import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import FruitCardCart from "../components/fruitCardCart";
import { cartItems } from "../constants";

export default function CartScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-orange-50">
      {/* Header */}
      <View className="flex-row justify-start items-center px-5 pt-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="border border-gray-300 p-2 rounded-xl"
        >
          <ChevronLeftIcon size={30} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <View className="flex-1 mx-5 mt-5 rounded-2xl bg-white shadow-lg p-4">
        <Text style={{ color: themeColors.text }} className="text-2xl pb-4">
          Your <Text className="font-bold">Cart</Text>
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="space-y-4"
        >
          {cartItems.map((item, index) => (
            <FruitCardCart fruit={item} key={index} />
          ))}
        </ScrollView>

        {/* Total Price */}
        <View className="flex-row justify-end pt-6">
          <Text className="text-lg">
            Total price:{" "}
            <Text className="font-bold text-yellow-500">240.70</Text>
          </Text>
        </View>
      </View>

      {/* Payment Button */}
      <View className="flex-row justify-between items-center mx-7 mt-5 mb-7">
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            opacity: 0.9,
            shadowColor: "orange",
            shadowRadius: 25,
            shadowOffset: { width: 0, height: 15 },
            shadowOpacity: 0.4,
          }}
          className="p-4 flex-1 rounded-2xl"
        >
          <Text className="text-xl text-center text-white font-bold">
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
