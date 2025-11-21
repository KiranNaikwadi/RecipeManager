const STORAGE_KEY = "recipes";

// ==================== ESCAPE HTML FOR SAFETY ====================
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ==================== GET RECIPES FROM LOCALSTORAGE ====================
function getRecipes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

// ==================== SAVE RECIPES TO LOCALSTORAGE ====================
function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// ==================== ADD NEW RECIPE ====================
function addRecipe(recipe) {
  const recipes = getRecipes();
  recipes.push(recipe);
  saveRecipes(recipes);
}

// ==================== UPDATE EXISTING RECIPE ====================
function updateRecipe(updatedRecipe) {
  let recipes = getRecipes();
  recipes = recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r));
  saveRecipes(recipes);
}

// ==================== REMOVE RECIPE BY ID ====================
function removeRecipe(id) {
  let recipes = getRecipes();
  recipes = recipes.filter((r) => r.id !== id);
  saveRecipes(recipes);
}

// ==================== LOAD INITIAL DATA ====================
function loadInitialData() {
  // Overwrite localStorage for development
  const dishes = [
    {
      id: Date.now() + 1,
      title: "Paneer Toofani",
      description: "Spicy, creamy paneer cooked in a rich onion-tomato-cashew gravy.",
      ingredients: [
        "250 g Paneer (cut into cubes)",
        "3 tbsp Curd (Yogurt)",
        "1 tsp Red Chilli Powder",
        "½ tsp Turmeric Powder",
        "½ tsp Garam Masala",
        "1 medium Onion (finely chopped)",
        "2 medium Tomato (chopped)",
        "10–12 Cashews (soaked in warm water for 15 minutes)",
        "2 tbsp Oil",
        "Salt to taste"
      ],
      steps: [
        "Turn on the gas flame to medium heat.",
        "Cut paneer into cubes and marinate with curd, red chilli powder, turmeric, garam masala, and salt. Let it rest for 10–15 minutes.",
        "Heat oil in a pan.",
        "Add chopped onions and sauté until golden brown (approx. 3–4 minutes).",
        "Add chopped tomatoes and cook until soft (approx. 5 minutes).",
        "Add soaked cashews, let it cool slightly, and blend to a smooth paste.",
        "Pour the cashew-tomato-onion paste back into the pan and cook on low-medium flame until oil separates (approx. 5–6 minutes).",
        "Add marinated paneer cubes, gently mix, and simmer on low flame for 5 minutes.",
        "Check seasoning and adjust salt if needed.",
        "Turn off the gas flame.",
        "Serve hot with naan, roti, or rice."
      ],
      prepTime: 30,
      difficulty: "Medium",
      imageUrl: "images/Paneer Toofani.jpg"
    },
    {
  id: Date.now() + 2,
  title: "Aloo Paratha",
  description: "Soft wheat parathas stuffed with spiced mashed potato filling.",
  ingredients: [
    "2 cups Wheat Flour",
    "3 medium Potatoes (boiled and mashed)",
    "2 Green Chillies (finely chopped)",
    "2 tbsp Fresh Coriander (chopped)",
    "1 tsp Red Chilli Powder",
    "Salt to taste",
    "2 tsp Ghee or Oil for cooking"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Boil potatoes until soft and mash them well.",
    "Mix mashed potatoes with green chillies, coriander, red chilli powder, and salt.",
    "Prepare a soft dough using wheat flour and water.",
    "Divide dough and potato mixture into equal portions.",
    "Stuff each dough portion with potato mixture and roll into a round paratha.",
    "Heat a pan on medium flame and cook each paratha with ghee or oil until golden brown on both sides.",
    "Turn off the gas flame.",
    "Serve hot with yogurt or pickle."
  ],
  prepTime: 25,
  difficulty: "Easy",
  imageUrl: "images/Aloo Paratha.jpg"
},
{
  id: Date.now() + 3,
  title: "Veg Pulao",
  description: "Aromatic basmati rice cooked with vegetables and spices.",
  ingredients: [
    "1 cup Basmati Rice",
    "1 small Carrot (chopped)",
    "50 g Beans (chopped)",
    "½ cup Green Peas",
    "2 tbsp Oil or Ghee",
    "1 tsp Cumin Seeds",
    "2–3 Cloves",
    "1 small Cinnamon Stick",
    "2 cups Water",
    "Salt to taste"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Wash and soak basmati rice for 20 minutes.",
    "Heat oil/ghee in a pan and add cumin seeds, cloves, and cinnamon.",
    "Add chopped carrot, beans, and peas. Sauté for 2–3 minutes.",
    "Add drained rice and sauté gently for 2 minutes.",
    "Add water and salt. Cover and cook on low flame until rice is fluffy and water is absorbed (approx. 10–12 minutes).",
    "Turn off the gas flame.",
    "Let it rest for 5 minutes and fluff the rice.",
    "Serve hot."
  ],
  prepTime: 20,
  difficulty: "Easy",
  imageUrl: "images/MasalaRice.jpg"
},
{
  id: Date.now() + 4,
  title: "Pav Bhaji",
  description: "Street-style spicy mashed vegetables served with buttered pav.",
  ingredients: [
    "2 medium Potatoes (boiled)",
    "1 cup Tomatoes (chopped)",
    "½ cup Green Peas (boiled)",
    "1 small Capsicum (chopped)",
    "2 tbsp Pav Bhaji Masala",
    "2 tbsp Butter or Oil",
    "Salt to taste",
    "Pav buns as needed"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Boil potatoes and peas until soft, then mash them.",
    "Heat butter/oil in a pan and sauté chopped tomatoes and capsicum.",
    "Add pav bhaji masala and salt, cook for 2–3 minutes.",
    "Add mashed vegetables and mix well, simmer for 5 minutes.",
    "Turn off the gas flame.",
    "Serve hot with buttered pav buns."
  ],
  prepTime: 30,
  difficulty: "Medium",
  imageUrl: "images/PavBhaji.jpg"
},{
  id: Date.now() + 5,
  title: "Idli",
  description: "Soft steamed idlis made from fermented rice and lentil batter.",
  ingredients: [
    "2 cups Idli Batter",
    "Oil for greasing moulds"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Grease idli moulds lightly with oil.",
    "Pour batter into moulds up to ¾ full.",
    "Steam idlis in a steamer for 10–12 minutes until cooked.",
    "Turn off the gas flame.",
    "Let idlis cool slightly and remove from moulds.",
    "Serve hot with chutney or sambar."
  ],
  prepTime: 20,
  difficulty: "Easy",
  imageUrl: "images/Idli.jpg"
},
{
  id: Date.now() + 6,
  title: "Egg Curry",
  description: "Boiled eggs cooked in a spicy onion-tomato gravy.",
  ingredients: [
    "4 Eggs (boiled)",
    "1 medium Onion (finely chopped)",
    "2 medium Tomatoes (chopped)",
    "½ tsp Turmeric Powder",
    "1 tsp Red Chilli Powder",
    "1 tsp Garam Masala",
    "2 tbsp Oil",
    "Salt to taste",
    "Water as needed"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Boil eggs and peel them.",
    "Heat oil in a pan and sauté chopped onions until golden.",
    "Add chopped tomatoes and cook until soft.",
    "Add turmeric, red chilli powder, garam masala, and salt. Mix well.",
    "Add some water to make gravy and bring it to a simmer.",
    "Add boiled eggs and cook for 5 minutes.",
    "Turn off the gas flame.",
    "Serve hot with rice or roti."
  ],
  prepTime: 25,
  difficulty: "Easy",
  imageUrl: "images/EggCurry.jpg"
},{
  id: Date.now() + 7,
  title: "Upma",
  description: "South Indian breakfast made with roasted semolina.",
  ingredients: [
    "1 cup Rava (Semolina)",
    "1 small Onion (chopped)",
    "½ cup mixed Veggies (optional)",
    "1 tsp Mustard Seeds",
    "2 tbsp Oil",
    "2 cups Water",
    "Salt to taste"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Roast rava in a dry pan until light golden, then set aside.",
    "Heat oil in a pan and add mustard seeds.",
    "Add onions and vegetables, sauté for 2–3 minutes.",
    "Add water and salt, bring to boil.",
    "Slowly add roasted rava while stirring continuously.",
    "Cook on low flame until water is absorbed and upma is fluffy.",
    "Turn off the gas flame.",
    "Serve hot with chutney or pickle."
  ],
  prepTime: 15,
  difficulty: "Easy",
  imageUrl: "images/Upma.jpg"
},
{
  id: Date.now() + 8,
  title: "Shev Bhaji",
  description: "Spicy Maharashtrian curry made with thick sev and tomato-onion gravy.",
  ingredients: [
    "1 cup Shev",
    "1 medium Onion (chopped)",
    "2 medium Tomatoes (chopped)",
    "1 tsp Garlic Paste",
    "1 tsp Red Chilli Powder",
    "½ tsp Turmeric Powder",
    "2 tbsp Oil",
    "Salt to taste",
    "Water as needed"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Heat oil and sauté onions until golden.",
    "Add tomatoes, garlic paste, turmeric, red chilli powder, and salt. Cook until soft.",
    "Add water and bring it to boil.",
    "Turn off the gas flame and add shev. Mix gently.",
    "Serve immediately."
  ],
  prepTime: 20,
  difficulty: "Easy",
  imageUrl: "images/ShevBhaji.jpg"
},
{
  id: Date.now() + 9,
  title: "Poha",
  description: "Light and fluffy poha cooked with onions, peanuts, and spices.",
  ingredients: [
    "1 cup Poha (flattened rice)",
    "1 medium Onion (chopped)",
    "1–2 Green Chillies (chopped)",
    "2 tbsp Peanuts",
    "1 tsp Mustard Seeds",
    "½ tsp Turmeric Powder",
    "2 tbsp Oil",
    "Salt to taste",
    "Coriander for garnish"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Wash poha in water and drain.",
    "Heat oil in a pan and fry peanuts until golden.",
    "Add mustard seeds, chopped onions, and green chillies. Sauté until onions are soft.",
    "Add turmeric and drained poha. Mix gently and cook for 2–3 minutes.",
    "Turn off the gas flame.",
    "Garnish with coriander and serve hot."
  ],
  prepTime: 10,
  difficulty: "Easy",
  imageUrl: "images/Poha.jpg"
},
{
  id: Date.now() + 10,
  title: "Masala Dosa",
  description: "Crispy dosa filled with spiced potato masala.",
  ingredients: [
    "2 cups Dosa Batter",
    "3 medium Potatoes (boiled and mashed)",
    "1 medium Onion (chopped)",
    "1 tsp Mustard Seeds",
    "1 tsp Turmeric Powder",
    "1 tsp Red Chilli Powder",
    "2 tbsp Oil",
    "Salt to taste",
    "Fresh Coriander for garnish"
  ],
  steps: [
    "Turn on the gas flame to medium heat.",
    "Boil and mash potatoes.",
    "Heat oil in a pan, add mustard seeds, onions, turmeric, red chilli powder, and salt. Sauté until onions are soft.",
    "Add mashed potatoes and cook for 2–3 minutes to make the masala.",
    "Heat a tawa/pan, pour a ladle of dosa batter and spread thinly.",
    "Add potato masala on top and fold the dosa.",
    "Cook until dosa is crispy and golden.",
    "Turn off the gas flame.",
    "Serve hot with chutney and sambar."
  ],
  prepTime: 35,
  difficulty: "Medium",
  imageUrl: "images/MasalaDosa.jpg"
}

  ];

  saveRecipes(dishes);
}

// ==================== CALL INITIAL DATA ====================
loadInitialData();

// ==================== SHOW DETAIL MODAL ====================
function showDetail(id) {
  const recipe = getRecipes().find(r => r.id === id);
  if (!recipe) return;

  const detailContent = document.getElementById("detailContent");
  const detailModal = document.getElementById("detailModal");

  detailContent.innerHTML = `
    <h2>${escapeHtml(recipe.title)}</h2>

    <img src="${recipe.imageUrl}" 
         style="width:100%; height:220px; object-fit:cover; border-radius:10px; margin:10px 0;" />

    <h3>Description</h3>
    <p>${escapeHtml(recipe.description)}</p>

    <h3>Ingredients</h3>
    <ul>
      ${recipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join("")}
    </ul>

    <h3>Steps</h3>
    <ol>
      ${recipe.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
    </ol>

    <p><strong>Prep Time:</strong> ${recipe.prepTime} mins</p>
    <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
  `;

  detailModal.classList.remove("hide-box");
}

// ==================== CLOSE DETAIL MODAL ====================
document.getElementById("closeDetail").addEventListener("click", () => {
  document.getElementById("detailModal").classList.add("hide-box");
});

// Close modal when clicking outside
document.getElementById("detailModal").addEventListener("click", (e) => {
  if (e.target.id === "detailModal") {
    e.target.classList.add("hide-box");
  }
});
