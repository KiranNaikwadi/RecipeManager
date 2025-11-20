loadInitialData();

const recipeList = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const difficultyFilter = document.getElementById("difficultyFilter");
const addRecipeBtn = document.getElementById("addRecipeBtn");
const recipeFormSection = document.getElementById("recipeFormSection");
const recipeForm = document.getElementById("recipeForm");
const formTitle = document.getElementById("formTitle");

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const ingredientsInput = document.getElementById("ingredients");
const stepsInput = document.getElementById("steps");
const prepTimeInput = document.getElementById("prepTime");
const difficultyInput = document.getElementById("difficulty");
const imageFileInput = document.getElementById("imageFile");
const imageUrlInput = document.getElementById("imageUrl");
const imagePreview = document.getElementById("imagePreview");
const cancelBtn = document.getElementById("cancelBtn");

let editingId = null;

function renderRecipes() {
  const recipes = getRecipes();
  const searchText = searchInput.value.toLowerCase();
  const diff = difficultyFilter.value;

  let filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchText)
  );

  if (diff !== "all") {
    filtered = filtered.filter((r) => r.difficulty === diff);
  }

  recipeList.innerHTML = filtered
    .map(
      (r) => `
      <div class="recipe-card">
        <img src="${r.imageUrl}" alt="${r.title}" />
        <h3>${r.title}</h3>
        <p>${r.description}</p>
        <p><strong>Prep:</strong> ${r.prepTime} mins</p>
        <p><strong>Difficulty:</strong> ${r.difficulty}</p>
        <button onclick="editRecipe(${r.id})" class="btn-main">Edit</button>
        <button onclick="deleteRecipe(${r.id})" class="btn-light">Delete</button>
      </div>
    `
    )
    .join("");
}

renderRecipes();

addRecipeBtn.addEventListener("click", () => {
  editingId = null;
  formTitle.textContent = "Add Recipe";
  recipeForm.reset();
  imagePreview.style.display = "none";
  recipeFormSection.classList.remove("hide-box");
});

cancelBtn.addEventListener("click", () => {
  recipeFormSection.classList.add("hide-box");
});

imageFileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    imagePreview.style.backgroundImage = `url(${e.target.result})`;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

imageUrlInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    imagePreview.style.backgroundImage = `url(${this.value})`;
    imagePreview.style.display = "block";
  }
});

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !titleInput.value.trim() ||
    !descriptionInput.value.trim() ||
    !ingredientsInput.value.trim() ||
    !stepsInput.value.trim() ||
    !prepTimeInput.value.trim()
  ) {
    alert("All required fields must be filled.");
    return;
  }

  const imageURL = imageFileInput.files[0]
    ? imagePreview.style.backgroundImage.replace('url("', "").replace('")', "")
    : imageUrlInput.value.trim() || "assets/default.jpg";

  const recipeData = {
    id: editingId || Date.now(),
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    ingredients: ingredientsInput.value.split(",").map((i) => i.trim()),
    steps: stepsInput.value.split("\n").map((s) => s.trim()),
    prepTime: parseInt(prepTimeInput.value),
    difficulty: difficultyInput.value,
    imageUrl: imageURL
  };

  if (editingId) {
    updateRecipe(recipeData);
  } else {
    addRecipe(recipeData);
  }

  recipeFormSection.classList.add("hide-box");
  renderRecipes();
});

function editRecipe(id) {
  const recipe = getRecipes().find((r) => r.id === id);
  if (!recipe) return;

  editingId = id;
  formTitle.textContent = "Edit Recipe";

  titleInput.value = recipe.title;
  descriptionInput.value = recipe.description;
  ingredientsInput.value = recipe.ingredients.join(", ");
  stepsInput.value = recipe.steps.join("\n");
  prepTimeInput.value = recipe.prepTime;
  difficultyInput.value = recipe.difficulty;
  imageUrlInput.value = recipe.imageUrl;

  if (recipe.imageUrl) {
    imagePreview.style.backgroundImage = `url(${recipe.imageUrl})`;
    imagePreview.style.display = "block";
  }

  recipeFormSection.classList.remove("hide-box");
}

function deleteRecipe(id) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    removeRecipe(id);
    renderRecipes();
  }
}

searchInput.addEventListener("input", renderRecipes);
difficultyFilter.addEventListener("change", renderRecipes);
