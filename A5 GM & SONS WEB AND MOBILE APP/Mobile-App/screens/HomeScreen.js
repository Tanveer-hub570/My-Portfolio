import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import FruitCard from "../components/fruitCard";
import FruitCardSales from "../components/fruitCardSales";
import { featuredFruits, featuredVegetables, featuredJuices, categories } from "../constants";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Fruits");
  const navigation = useNavigation();

  const renderCategoryItems = () => {
    switch (activeCategory) {
      case "Fruits":
        return (
          <>
            <View className="carousel mt-8">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {featuredFruits.map((fruit, index) => (
                  <FruitCard fruit={fruit} key={index} />
                ))}
              </ScrollView>
            </View>

            <View className="mt-8 pl-5 space-y-1">
              <Text style={{ color: themeColors.text }} className="text-xl font-bold">
                Big Sale
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: "visible" }}>
                {featuredFruits.map((fruit, index) => (
                  <FruitCardSales key={index} fruit={fruit} />
                ))}
              </ScrollView>
            </View>
          </>
        );
      case "Vegetables":
        return (
          <View className="carousel mt-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredVegetables.map((item, index) => (
                <FruitCard fruit={item} key={index} />
              ))}
            </ScrollView>
          </View>
        );
      case "Fresh Juices":
        return (
          <View className="carousel mt-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredJuices.map((juice, index) => (
                <FruitCard fruit={juice} key={index} />
              ))}
            </ScrollView>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50">
      {/* Top Bar */}
      <View className="navbar mx-5 flex-row justify-between items-center">
        <Bars3CenterLeftIcon size={30} color="black" />
        <TouchableOpacity onPress={() => navigation.navigate("Cart")} className="p-2 rounded-xl bg-orange-100">
          <ShoppingCartIcon size={25} color="orange" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="mt-4">
        <Text style={{ color: themeColors.black }} className="text-2xl tracking-widest font-extrabold ml-5">
          Explore Fruits & Juices
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center space-x-2 px-4 pb-2 mt-3">
          <View className="flex-row flex-1 items-center p-3 h-11 rounded-full border-2 border-gray-300">
            <Icon.Search height={25} width={25} color="gray" />
            <TextInput placeholder="Search" className="ml-2 flex-1 text-gray-600" />
          </View>
        </View>

        {/* Categories */}
        <ScrollView className="mt-5 px-5" horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => {
            const isActive = category === activeCategory;
            const textClass = `text-xl ${isActive ? "font-bold" : ""}`;
            const buttonClass = `mr-8 relative items-center py-0.5 ${
              isActive ? "rounded-full border-2 border-slate-800 px-4" : ""
            }`;

            return (
              <TouchableOpacity
                key={index}
                className={buttonClass}
                onPress={() => {
                  if (category === "Fresh Juices") {
                    navigation.navigate("Juices");
                  } else {
                    setActiveCategory(category);
                  }
                }}
              >
                <Text style={{ color: themeColors.text }} className={textClass}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Render Items Based on Active Category */}
        {renderCategoryItems()}
      </ScrollView>
    </SafeAreaView>
  );
}
