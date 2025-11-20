const STORAGE_KEY = "recipes";

function getRecipes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

function addRecipe(recipe) {
  const recipes = getRecipes();
  recipes.push(recipe);
  saveRecipes(recipes);
}

function updateRecipe(updatedRecipe) {
  let recipes = getRecipes();
  recipes = recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r));
  saveRecipes(recipes);
}

function removeRecipe(id) {
  let recipes = getRecipes();
  recipes = recipes.filter((r) => r.id !== id);
  saveRecipes(recipes);
}

function loadInitialData() {
  const existing = getRecipes();
  if (existing.length > 0) return;

  const dishes = [
    {
      id: Date.now() + 1,
      title: "Paneer Toofani",
      description: "Spicy, creamy paneer cooked in a rich onion-tomato-cashew gravy.",
      ingredients: [
        "Paneer","Curd","Red Chilli Powder","Turmeric",
        "Onion","Tomato","Cashews","Garam Masala","Oil"
      ],
      steps: [
        "Cut paneer into cubes and marinate with curd and spices.",
        "Heat oil and sauté onions until golden.",
        "Add tomatoes and cook until soft.",
        "Add cashews, cool and blend to paste.",
        "Cook paste until oil separates.",
        "Add paneer and simmer 5 minutes.",
        "Serve hot."
      ],
      prepTime: 30,
      difficulty: "medium",
      imageUrl: "images/Paneer Toofani.jpg"
    },

    {
      id: Date.now() + 2,
      title: "Aloo Paratha",
      description: "Soft wheat parathas stuffed with spiced mashed potato filling.",
      ingredients: [
        "Wheat Flour","Potatoes","Green Chillies",
        "Coriander","Salt","Red Chilli Powder","Ghee"
      ],
      steps: [
        "Boil and mash potatoes.",
        "Mix chillies, coriander and spices.",
        "Prepare dough with wheat flour.",
        "Stuff potato mixture.",
        "Roll and cook with ghee.",
        "Serve hot."
      ],
      prepTime: 25,
      difficulty: "easy",
      imageUrl: "images/Aloo Paratha.jpg"
    },

    {
      id: Date.now() + 3,
      title: "Veg Pulao",
      description: "Aromatic basmati rice cooked with vegetables and spices.",
      ingredients: ["Rice","Carrot","Beans","Peas","Oil","Whole Spices"],
      steps: [
        "Wash and soak rice.",
        "Heat oil and add spices.",
        "Add vegetables.",
        "Add rice and sauté.",
        "Add water and cook.",
        "Serve hot."
      ],
      prepTime: 20,
      difficulty: "easy",
      imageUrl: "images/MasalaRice.jpg"
    },

    {
      id: Date.now() + 4,
      title: "Masala Dosa",
      description: "Crispy dosa filled with spiced aloo masala.",
      ingredients: ["Dosa Batter","Potatoes","Onion","Mustard Seeds","Spices"],
      steps: [
        "Boil potatoes.",
        "Sauté onions with mustard seeds.",
        "Add spices and potatoes.",
        "Spread dosa batter.",
        "Add masala and fold.",
        "Serve hot."
      ],
      prepTime: 35,
      difficulty: "medium",
      imageUrl: "images/MasalaDosa.jpg"
    },

    {
      id: Date.now() + 5,
      title: "Shev Bhaji",
      description: "Spicy Maharashtrian curry made with thick sev.",
      ingredients: ["Shev","Onion","Tomato","Garlic","Red Chilli","Turmeric"],
      steps: [
        "Sauté onions.",
        "Add tomatoes and spices.",
        "Add water and boil.",
        "Turn off heat and add shev.",
        "Serve immediately."
      ],
      prepTime: 20,
      difficulty: "easy",
      imageUrl: "images/ShevBhaji.jpg"
    },

    {
      id: Date.now() + 6,
      title: "Poha",
      description: "Light poha cooked with onions, peanuts and spices.",
      ingredients: ["Poha","Onion","Green Chillies","Peanuts","Mustard Seeds"],
      steps: [
        "Wash poha.",
        "Fry peanuts.",
        "Sauté onions and chillies.",
        "Add turmeric and poha.",
        "Mix and cook 3 minutes.",
        "Serve hot."
      ],
      prepTime: 10,
      difficulty: "easy",
      imageUrl: "images/Poha.jpg"
    },

    {
      id: Date.now() + 7,
      title: "Upma",
      description: "South Indian breakfast made with semolina.",
      ingredients: ["Rava","Onion","Mustard Seeds","Veggies","Oil"],
      steps: [
        "Roast rava.",
        "Heat oil and add mustard seeds.",
        "Add onions and veggies.",
        "Add water and boil.",
        "Slowly add rava.",
        "Cook until fluffy."
      ],
      prepTime: 15,
      difficulty: "easy",
      imageUrl: "images/Upma.jpg"
    },

    {
      id: Date.now() + 8,
      title: "Pav Bhaji",
      description: "Street-style spicy mashed vegetables.",
      ingredients: ["Potatoes","Tomato","Peas","Capsicum","Pav Bhaji Masala"],
      steps: [
        "Boil potatoes and peas.",
        "Mash vegetables.",
        "Cook tomatoes and capsicum.",
        "Add mashed mix.",
        "Simmer and serve with pav."
      ],
      prepTime: 30,
      difficulty: "medium",
      imageUrl: "https://www.pexels.com/photo/cooked-food-on-stainless-steel-tray-7625089/"
    },

    {
      id: Date.now() + 9,
      title: "Idli",
      description: "Soft steamed idlis.",
      ingredients: ["Idli Batter","Oil"],
      steps: [
        "Grease moulds.",
        "Pour batter.",
        "Steam 10 minutes.",
        "Cool and remove.",
        "Serve hot."
      ],
      prepTime: 20,
      difficulty: "easy",
      imageUrl: "images/Idli.jpg"
    },

    {
      id: Date.now() + 10,
      title: "Chole",
      description: "Punjabi-style chickpea curry.",
      ingredients: ["Chickpeas","Onion","Tomato","Ginger Garlic","Spices"],
      steps: [
        "Soak chickpeas.",
        "Boil until soft.",
        "Cook onions and tomatoes.",
        "Add spices and chickpeas.",
        "Simmer and serve."
      ],
      prepTime: 40,
      difficulty: "medium",
      imageUrl: "images/Chole.jpg"
    },

    {
      id: Date.now() + 11,
      title: "Egg Curry",
      description: "Boiled eggs in spicy curry.",
      ingredients: ["Eggs","Onion","Tomato","Turmeric","Chilli Powder"],
      steps: [
        "Boil eggs.",
        "Fry onions.",
        "Add tomatoes.",
        "Add spices and water.",
        "Add eggs.",
        "Serve hot."
      ],
      prepTime: 25,
      difficulty: "easy",
      imageUrl: "images/EggCurry.jpg"
    }
  ];

  saveRecipes(dishes);
}
      