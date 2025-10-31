

const menuData = [
  // ===== VEG STARTERS =====
  { id: 1, category: "Veg Starters", name: "Cheese Corn Samosa (3 pcs)", price: "40", img: "https://picsum.photos/400?2" },
  { id: 2, category: "Veg Starters", name: "Cheese Jalapeno Samosa (3 pcs)", price: "40", img: "https://picsum.photos/400?2" },
  { id: 3, category: "Veg Starters", name: "Cheese Pizza Samosa (3 pcs)", price: "40", img: "https://picsum.photos/400?3" },
  { id: 4, category: "Veg Starters", name: "Crispy Potato Wedges", price: "40", img: "https://picsum.photos/400?4" },
  { id: 5, category: "Veg Starters", name: "Aloo Masala Tikki (3 pcs)", price: "40", img: "https://picsum.photos/400?5" },
  { id: 6, category: "Veg Starters", name: "Tandoori Nuggets (6 pcs)", price: "50", img: "https://picsum.photos/400?6" },
  { id: 7, category: "Veg Starters", name: "Chilli Garlic Potato Popcorn", price: "50", img: "https://picsum.photos/400?7" },
  { id: 8, category: "Veg Starters", name: "Veg Cutlet (2 pcs)", price: "50", img: "https://picsum.photos/400?8" },
  { id: 9, category: "Veg Starters", name: "Garlic Bread", price: "60", img: "https://picsum.photos/400?9" },
  { id: 10, category: "Veg Starters", name: "French Fries", price: "70", img: "https://picsum.photos/400?10" },
  { id: 11, category: "Veg Starters", name: "Cheese Garlic Bread", price: "80", img: "https://picsum.photos/400?11" },
  { id: 12, category: "Veg Starters", name: "Veggie Fingers (7 pcs)", price: "80", img: "https://picsum.photos/400?12" },
  { id: 13, category: "Veg Starters", name: "Potato Cheese Shotz (3 pcs)", price: "90", img: "https://picsum.photos/400?13" },

  // ===== LOADED FRENCH FRIES =====
  { id: 14, category: "Loaded French Fries", name: "Spicy Masala French Fries", price: "80", img: "https://picsum.photos/400?14" },
  { id: 15, category: "Loaded French Fries", name: "Cheese Diced French Fries", price: "90", img: "https://picsum.photos/400?15" },
  { id: 16, category: "Loaded French Fries", name: "Chocolicious French Fries", price: "100", img: "https://picsum.photos/400?16" },

  // ===== NON VEG =====
  { id: 17, category: "Non Veg", name: "Chicken Cutlet (2 pcs)", price: "90", img: "https://picsum.photos/400?17" },
  { id: 18, category: "Non Veg", name: "Cheese Omelette", price: "90", img: "https://picsum.photos/400?18" },
  { id: 19, category: "Non Veg", name: "Chicken Popcorn", price: "100", img: "https://picsum.photos/400?19" },
  { id: 20, category: "Non Veg", name: "Chicken Cheese Popcorn", price: "100", img: "https://picsum.photos/400?20" },
  { id: 21, category: "Non Veg", name: "Chicken Fingers (3 pcs)", price: "100", img: "https://picsum.photos/400?21" },
  { id: 22, category: "Non Veg", name: "Chicken Nuggets (6 pcs)", price: "100", img: "https://picsum.photos/400?22" },
  { id: 23, category: "Non Veg", name: "Chicken Cheese Nuggets (7 pcs)", price: "110", img: "https://picsum.photos/400?23" },

  // ===== HOT COFFEES =====
  { id: 24, category: "Hot Coffees", name: "Filter Coffee", price: "55", img: "https://picsum.photos/400?24" },
  { id: 25, category: "Hot Coffees", name: "Espresso", price: "60", img: "https://picsum.photos/400?25" },
  { id: 26, category: "Hot Coffees", name: "Americano", price: "70", img: "https://picsum.photos/400?26" },
  { id: 27, category: "Hot Coffees", name: "Café Latte", price: "85", img: "https://picsum.photos/400?27" },
  { id: 28, category: "Hot Coffees", name: "Cappuccino", price: "90", img: "https://picsum.photos/400?28" },
  { id: 29, category: "Hot Coffees", name: "Café Mocha", price: "90", img: "https://picsum.photos/400?29" },
  { id: 30, category: "Hot Coffees", name: "Hot Chocolate", price: "90", img: "https://picsum.photos/400?30" },
  { id: 31, category: "Hot Coffees", name: "Irish Regular", price: "90", img: "https://picsum.photos/400?31" },

  // ===== FLAVOURED COFFEES =====
  { id: 32, category: "Flavoured Coffees", name: "Hazelnut", price: "100", img: "https://picsum.photos/400?32" },
  { id: 33, category: "Flavoured Coffees", name: "Vanilla", price: "100", img: "https://picsum.photos/400?33" },
  { id: 34, category: "Flavoured Coffees", name: "Caramel", price: "100", img: "https://picsum.photos/400?34" },

  // ===== COLD COFFEES =====
  { id: 35, category: "Cold Coffees", name: "Frappe Chill", price: "100", img: "https://picsum.photos/400?35" },
  { id: 36, category: "Cold Coffees", name: "Italian Choco Swiss", price: "110", img: "https://picsum.photos/400?36" },
  { id: 37, category: "Cold Coffees", name: "Café Vanilla Frappe", price: "120", img: "https://picsum.photos/400?37" },
  { id: 38, category: "Cold Coffees", name: "Choco Chill Frappe", price: "120", img: "https://picsum.photos/400?38" },
  { id: 39, category: "Cold Coffees", name: "Café Cookie Crunch", price: "130", img: "https://picsum.photos/400?39" },
  { id: 40, category: "Cold Coffees", name: "Café Caramel Frappe", price: "130", img: "https://picsum.photos/400?40" },
  { id: 41, category: "Cold Coffees", name: "Ice Cream Topping", price: "20", img: "https://picsum.photos/400?41" },
];

export default menuData;
