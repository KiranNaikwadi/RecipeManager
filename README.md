Information About Project:
A simple and interactive Recipe Manager web application that allows users to add, edit, delete, and view recipes. Users can filter recipes by difficulty, search by title, and view recipe details with ingredients, steps, and preparation time. The app uses localStorage to save recipes and works offline.

The app is built using HTML, CSS, and JavaScript without any backend.

Add new recipe with:
Title
Short description
Ingrediants
Steps
Preparation time
Difficulty:in Easy,Medium,Hard
Image
Or Upload Image URL
Edit Receipe 
Delete Recipe
Search recipes by title
Filter recipes by difficulty
View full recipe details in a Read More 
Preview recipe images before saving
Responsive design
All data saved in localStorage


Application Structure:
RecipeWebApp/
├── index.html        # HTML file
├── css/
│   └── style.css     # Styling the app
├── js/
│   ├── script.js     # Main JS logic
│   └── storage.js    # LocalStorage
├──images             # images  
└── README.md         # Project documentation


JavaScript Modules
Script.js and Strorage.js

renderRecipes() – Displays recipes in cards, handles No recipes available.

addRecipe() / updateRecipe() / removeRecipe() CRUD operations in localStorage.

showDetail(id) – Opens the Read More modal.

editRecipe(id) – Opens the edit form modal.

deleteRecipe(id) – Deletes the recipe after confirmation.

Image Handling – Supports both file upload and URL input with preview.

LocalStorage Functions:
getRecipes():Retrieves all recipes
addRecipe(recipe): Adds a new recipe
updateRecipe(recipe): Updates an existing recipe
removeRecipe(id):Deletes a recipe

Data Structure:
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
}


Assumptions:
Recipes are managed entirely on the client-side using localStorage.
Recipe image is optional; a default image is displayed if none is provided.
The app works on modern browsers Chrome, Firefox.
Users provide ingredients as comma-separated values.
Steps are entered as newline-separated text.


Limitations:
No backend: recipes are lost if localStorage is cleared.
No user authentication; anyone can add/edit/delete.
Images uploaded are not stored permanently; only base64 is saved in localStorage.
Maximum image size is limited by localStorage capacity



Known Issues:
Large images may cause slow rendering due to base64 storage.
LocalStorage is limited; too many recipes may fail to save.
Mobile responsiveness works but may need tweaks for very small screens


How to run the app:
Open index.html in a browser.
Add, edit, delete recipes using the interface.
Use search and difficulty filter to find recipes.
Click Read More to see full details/Recipe in a App.

Usage:
Click Add Recipes to open the form.
Fill all required fields.
Upload an image or provide an image URL.
Click Save to add the recipe.
Use the Read More button to see the full recipe.
Use Edit and Delete buttons to manage recipes.
Search or filter recipes using the top bar.



