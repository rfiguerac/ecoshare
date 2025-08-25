// Mock data to simulate an inbox and chat history
const Chats = [
  {
    id: 1,
    sender: "Alex S.",
    lastMessage: "The donation is ready for pickup.",
    timestamp: "10:30 AM",
    isRead: false,
    messages: [
      { id: 101, text: "Hello, is the children's clothing donation still available?", sender: "You" },
      { id: 102, text: "Yes, it is! When would you like to pick it up?", sender: "Alex S." },
      { id: 103, text: "I can be there this afternoon.", sender: "You" },
      { id: 104, text: "Great, the donation is ready for pickup.", sender: "Alex S." },
    ],
  },
  {
    id: 2,
    sender: "Maria D.",
    lastMessage: "Thank you for the school supplies!",
    timestamp: "Yesterday",
    isRead: true,
    messages: [
      { id: 201, text: "Hey, is the school supplies donation still available?", sender: "You" },
      { id: 202, text: "It is, I've marked it as reserved for you.", sender: "Maria D." },
      { id: 203, text: "Thank you for the school supplies!", sender: "Maria D." },
    ],
  },
  {
    id: 3,
    sender: "John P.",
    lastMessage: "I'm on my way to pick up the books.",
    timestamp: "2 days ago",
    isRead: false,
    messages: [
      { id: 301, text: "Hello, I'm interested in the book collection.", sender: "You" },
      { id: 302, text: "Awesome! Let me know when you're close.", sender: "John P." },
      { id: 303, text: "I'm on my way to pick up the books.", sender: "John P." },
    ],
  },
];

export default Chats;