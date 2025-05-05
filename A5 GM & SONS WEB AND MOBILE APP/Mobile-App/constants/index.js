export const categories = ["Fruits", "Juices" , "Vegatables"];
export const featuredFruits = [
  {
    name: "Apple",
    shadow: "#f87171",
    price: "12",
    stars: 3,
    desc: "Sweet and juicy",
    image: require("../assets/images/peach.png"),
    color: (opacity) => `rgba(255, 170, 157, ${opacity})`,
  },
  {
    name: "Black Grapes",
    price: "40",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "#c084fc",
    image: require("../assets/images/grapes.png"),
    color: (opacity) => `rgba(214, 195, 246, ${opacity})`,
  },
  {
    name: "Australian Orange",
    price: "12.30",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "#fb923c",
    image: require("../assets/images/orange.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    name: "Red Grapefruit",
    price: "30",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "#ef4444",
    image: require("../assets/images/redOrange.png"),
    color: (opacity) => `rgba(255, 163, 120, ${opacity})`,
  },
  {
    name: "Strawberry",
    price: "12.30",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "#f43f5e",
    image: require("../assets/images/strawberry.png"),
    color: (opacity) => `rgba(253,164,175, ${opacity})`,
  },
  {
    name: "Green Apple",
    price: "10.5",
    stars: 4,
    desc: "Sweet and juicy",
    shadow: "#4ade80",
    image: require("../assets/images/greenApple.png"),
    color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
  },
];

export const cartItems = [
  {
    name: "Australian Orange",
    price: "12.30",
    qty: 4,
    desc: "Sweet and juicy",
    shadow: "orange",
    image: require("../assets/images/orange.png"),
    color: (opacity) => `rgba(251, 216, 146, ${opacity})`,
  },
  {
    name: "Flesh Nectari",
    shadow: "red",
    price: "12",
    qty: 3,
    desc: "Sweet and juicy",
    image: require("../assets/images/peach.png"),
    color: (opacity) => `rgba(255, 170, 157, ${opacity})`,
  },

  {
    name: "Black Grapes",
    price: "40",
    qty: 2,
    desc: "Sweet and juicy",
    shadow: "purple",
    image: require("../assets/images/grapes.png"),
    color: (opacity) => `rgba(214, 195, 246, ${opacity})`,
  },
  {
    name: "Green Apple",
    price: "10.5",
    qty: 2,
    desc: "Sweet and juicy",
    shadow: "green",
    image: require("../assets/images/greenApple.png"),
    color: (opacity) => `rgba(139, 243, 139, ${opacity})`,
  },
  

];
export const featuredJuices = [
  {
    id: 1,
    name: 'Orange Juice',
    price: '$25',
    desc: 'Fresh and tangy',
    color: 'rgba(255, 223, 186, 1)',
    image: require('../assets/images/orange_juice.png'),
  },
  {
    id: 2,
    name: 'Mango Juice',
    price: '$30',
    desc: 'Sweet and pulpy',
    color: 'rgba(255, 236, 179, 1)',
    image: require('../assets/images/mango_juice.png'),
  },
];
