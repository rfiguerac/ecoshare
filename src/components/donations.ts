import type { Donation } from "../domain/interfaces/Donation";

export const donations: Donation[] = [
  {
    id: 1,
    title: "Children's Clothing",
    description:
      "A large bag of children's clothes, sizes 4-6, in good condition.",
    idDoner: 112,
    idCategory: 1,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop",
    location: { latitude: 41.3851, longitude: 2.1734 },
    expiryDate: new Date("2025-09-01"),
  },
  {
    id: 2,
    title: "Canned Food Pack",
    description:
      "Box of assorted canned goods including beans, tomatoes, and tuna.",
    idDoner: 210,
    idCategory: 2,
    state: "Available",
    urgent: true,
    imageUrl:
      "https://images.unsplash.com/photo-1619995746608-bef3de4f075a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.4036, longitude: 2.1744 },
  },
  {
    id: 3,
    title: "School Supplies",
    description:
      "Notebooks, pens, pencils, and backpacks for primary school students.",
    idDoner: 145,
    idCategory: 3,
    state: "Available",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1663127374925-56558b81cd38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.3902, longitude: 2.154 },
    expiryDate: new Date("2025-12-15"),
  },
  {
    id: 4,
    title: "Baby Stroller",
    description: "Lightweight stroller in excellent condition, barely used.",
    idDoner: 178,
    idCategory: 4,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1714392512700-4cab9e51710b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.372, longitude: 2.168 },
  },
  {
    id: 5,
    title: "Winter Jackets",
    description: "Three adult winter jackets, gently used and freshly washed.",
    idDoner: 199,
    idCategory: 1,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=2070&auto=format&fit=crop",
    location: { latitude: 41.3842, longitude: 2.186 },
  },
  {
    id: 6,
    title: "Furniture Set",
    description: "Small dining table with four chairs, solid wood.",
    idDoner: 220,
    idCategory: 5,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    location: { latitude: 41.3891, longitude: 2.16 },
  },
];
