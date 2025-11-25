const recipeList = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const difficultyFilter = document.getElementById("difficultyFilter");
const timeFilter = document.getElementById("timeFilter");
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

const detailModal = document.getElementById("recipeDetailModal");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");
const backBtn = document.getElementById("backBtn");

let editingId = null;

// Escape HTML
function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ----------------
// RENDER RECIPES
// ----------------
function renderRecipes() {
  const recipes = getRecipes(); // from storage.js
  const searchText = (searchInput.value || "").toLowerCase();
  const diff = difficultyFilter.value || "all";
  const timeValue = timeFilter.value.trim();

  let filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(searchText)
  );

  if (diff !== "all") {
    filtered = filtered.filter(r => r.difficulty === diff);
  }

  if (timeValue !== "") {
    const inputTime = parseInt(timeValue, 10);
    if (!isNaN(inputTime)) {
      filtered = filtered.filter(r => Number(r.prepTime) <= inputTime);
    }
  }

  recipeList.innerHTML = "";

  if (filtered.length === 0) {
    recipeList.style.display = "flex";
    recipeList.style.justifyContent = "center";
    recipeList.style.alignItems = "center";

    const msg = document.createElement("div");
    msg.textContent = "Recipe Not Available.";
    msg.style.fontSize = "1.8rem";
    msg.style.color = "yellow";
    recipeList.appendChild(msg);
    return;
  }

  recipeList.style.display = "grid";

  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${r.imageUrl || 'default.jpg'}" />
      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml(r.description)}</p>

      <div class="recipe-info">
        <span>Prep: ${r.prepTime} mins</span>
        <span>Difficulty: ${r.difficulty}</span>
      </div>

      <div class="read-more-top">
        <button class="btn-main read-more-btn">Read More</button>
      </div>

      <div class="card-btns" style="margin-top:10px;">
        <button class="btn-main edit-btn">Edit</button>
        <button class="btn-light delete-btn">Delete</button>
      </div>
    `;

    card.querySelector(".read-more-btn").addEventListener("click", () => showDetail(r.id));
    card.querySelector(".edit-btn").addEventListener("click", () => editRecipe(r.id));
    card.querySelector(".delete-btn").addEventListener("click", () => deleteRecipe(r.id));

    recipeList.appendChild(card);
  });

  backBtn.classList.toggle("hide-box", !searchInput.value && diff === "all" && timeValue === "");
}

// ----------------
// ADD + EDIT
// ----------------
addRecipeBtn.addEventListener("click", () => {
  editingId = null;
  formTitle.textContent = "Add Recipe";
  recipeForm.reset();
  imagePreview.style.display = "none";
  recipeFormSection.classList.remove("hide-box");
});

cancelBtn.addEventListener("click", () => recipeFormSection.classList.add("hide-box"));

imageFileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) { imagePreview.style.display = "none"; return; }

  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.style.backgroundImage = `url(${e.target.result})`;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

imageUrlInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    imagePreview.style.backgroundImage = `url(${this.value.trim()})`;
    imagePreview.style.display = "block";
  }
});

// --------------- FORM SUBMIT VALIDATION ----------------
recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Manual validation
  if (!titleInput.value.trim() || !descriptionInput.value.trim() || !ingredientsInput.value.trim() || !stepsInput.value.trim() || !prepTimeInput.value.trim() || !difficultyInput.value) {
    alert("Please fill all fields before saving!");
    return;
  }

  const recipeData = {
    id: editingId || Date.now(),
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    ingredients: ingredientsInput.value.split(",").map(i => i.trim()),
    steps: stepsInput.value.split("\n").map(s => s.trim()),
    prepTime: parseInt(prepTimeInput.value, 10),
    difficulty: difficultyInput.value,
    imageUrl: imageUrlInput.value.trim() || ""
  };

  const file = imageFileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = ev => {
      recipeData.imageUrl = ev.target.result;
      saveRecipeData(recipeData);
    };
    reader.readAsDataURL(file);
  } else {
    if (!recipeData.imageUrl) recipeData.imageUrl = "default.jpg";
    saveRecipeData(recipeData);
  }
});

function saveRecipeData(recipe) {
  if (editingId) updateRecipe(recipe); // from storage.js
  else addRecipe(recipe); // from storage.js

  recipeFormSection.classList.add("hide-box");
  renderRecipes();
}

function editRecipe(id) {
  const r = getRecipes().find(x => x.id === id);
  if (!r) return alert("Recipe not found");

  editingId = id;
  formTitle.textContent = "Edit Recipe";

  titleInput.value = r.title;
  descriptionInput.value = r.description;
  ingredientsInput.value = r.ingredients.join(", ");
  stepsInput.value = r.steps.join("\n");
  prepTimeInput.value = r.prepTime;
  difficultyInput.value = r.difficulty;
  imageUrlInput.value = r.imageUrl;

  imagePreview.style.backgroundImage = `url(${r.imageUrl})`;
  imagePreview.style.display = "block";

  recipeFormSection.classList.remove("hide-box");
}

function deleteRecipe(id) {
  if (!confirm("Are you sure?")) return;
  removeRecipe(id); // from storage.js
  renderRecipes();
}

// ----------------
// DETAIL MODAL
// ----------------
function showDetail(id) {
  const r = getRecipes().find(x => x.id === id);
  if (!r) return alert("Recipe not found");

  detailContent.innerHTML = `
    <h2>${escapeHtml(r.title)}</h2>
    <img src="${r.imageUrl}" style="width:100%; max-height:250px; object-fit:cover;">
    <p><strong>Description:</strong> ${escapeHtml(r.description)}</p>
    <h4>Ingredients:</h4>
    <ul>${r.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    <h4>Steps:</h4>
    <ol>${r.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
    <p><strong>Prep Time:</strong> ${r.prepTime} mins</p>
    <p><strong>Difficulty:</strong> ${r.difficulty}</p>
  `;

  detailModal.classList.remove("hide-box");
}

closeDetail.addEventListener("click", () => detailModal.classList.add("hide-box"));

detailModal.addEventListener("click", e => {
  if (e.target === detailModal) detailModal.classList.add("hide-box");
});

// ----------------
// EVENT LISTENERS
// ----------------
searchInput.addEventListener("input", renderRecipes);
difficultyFilter.addEventListener("change", renderRecipes);
timeFilter.addEventListener("input", renderRecipes);

backBtn.addEventListener("click", () => {
  searchInput.value = "";
  difficultyFilter.value = "all";
  timeFilter.value = "";
  renderRecipes();
});

renderRecipes();
