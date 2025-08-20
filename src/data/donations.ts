import type { Donation } from "../domain/interfaces/Donation";

export const donations: Donation[] = [
  {
    id: 1,
    title: "Children's Clothing",
    description:
      "A large bag of children's clothes, sizes 4-6, in good condition.",
    idDoner: 112,
    idCategory: 2,
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
    idCategory: 1,
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
    idCategory: 4,
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
    idCategory: 8,
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
    idCategory: 2,
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
    idCategory: 3,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    location: { latitude: 41.3891, longitude: 2.16 },
  },
  {
    id: 8,
    title: "Living Room Sofa",
    description:
      "Gently used two-seater sofa with a beige fabric cover, good for a small apartment.",
    idDoner: 155,
    idCategory: 3,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.383, longitude: 2.17 },
  },
  {
    id: 9,
    title: "Brand New Laptop",
    description:
      "A new, sealed-box laptop, model XYZ-100. Ideal for a student or small business.",
    idDoner: 250,
    idCategory: 6,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1501&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.398, longitude: 2.19 },
  },
  {
    id: 10,
    title: "Children's Toys Set",
    description:
      "A large bin of assorted toys, including building blocks, cars, and action figures.",
    idDoner: 180,
    idCategory: 5, // Toys
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1696527014285-fd0fe136635a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.387, longitude: 2.182 },
  },
  {
    id: 11,
    title: "Soccer Equipment",
    description:
      "Includes a soccer ball, shin guards, and a pair of cleats (size 9).",
    idDoner: 215,
    idCategory: 7, // Sports
    state: "Available",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1663133626876-1b86d33c0952?q=80&w=1571&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.405, longitude: 2.161 },
  },
  {
    id: 12,
    title: "Hardcover Book Collection",
    description: "A mix of classic and modern novels, all in good condition.",
    idDoner: 145,
    idCategory: 4,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1708007325112-64d98196bc06?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.392, longitude: 2.155 },
  },
  {
    id: 13,
    title: "Used Bicycle",
    description:
      "An adult-sized bicycle with some wear and tear but is fully functional.",
    idDoner: 178,
    idCategory: 8,
    state: "Available",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.375, longitude: 2.169 },
  },
  {
    id: 16,
    title: "Used Baby Crib",
    description:
      "A used baby crib in good condition. Great for anyone starting a family.",
    idDoner: 178,
    idCategory: 8,
    state: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1581702539705-3f78dfff135f?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: { latitude: 41.378, longitude: 2.164 },
  },
];
