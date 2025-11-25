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

function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function renderRecipes() {
  const recipes = getRecipes();
  const searchText = (searchInput.value || "").toLowerCase();
  const diff = difficultyFilter.value || "all";
  const timeValue = timeFilter.value.trim();

  let filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(searchText)
  );

  if (diff !== "all") {
    filtered = filtered.filter(r => r.difficulty === diff);
  }

  // UPDATED TIME FILTER: <= INPUT TIME
  if (timeValue !== "") {
    const maxTime = parseInt(timeValue, 10);
    filtered = filtered.filter(r => r.prepTime <= maxTime);
  }

  recipeList.innerHTML = "";

  if (filtered.length === 0) {
    recipeList.style.display = "flex";
    recipeList.style.justifyContent = "center";
    recipeList.style.alignItems = "center";

    const msg = document.createElement("div");
    msg.textContent = "Recipe Not Available";
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
        <button class="read-more-btn">Read More</button>
      </div>

      <div class="card-btns">
        <button class="btn-main">Edit</button>
        <button class="btn-light">Delete</button>
      </div>
    `;

    card.querySelector(".read-more-btn").addEventListener("click", () => showDetail(r.id));
    card.querySelector(".btn-main").addEventListener("click", () => editRecipe(r.id));
    card.querySelector(".btn-light").addEventListener("click", () => deleteRecipe(r.id));

    recipeList.appendChild(card);
  });

  if (searchText || diff !== "all" || timeValue !== "") {
    backBtn.classList.remove("hide-box");
  } else {
    backBtn.classList.add("hide-box");
  }
}

addRecipeBtn.addEventListener("click", () => {
  editingId = null;
  formTitle.textContent = "Add Recipe";
  recipeForm.reset();
  imagePreview.style.display = "none";
  recipeFormSection.classList.remove("hide-box");
});

cancelBtn.addEventListener("click", () => recipeFormSection.classList.add("hide-box"));

imageFileInput.addEventListener("change", function() {
  const file = this.files[0];
  if (!file) { imagePreview.style.display = "none"; return; }

  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.style.backgroundImage = `url(${e.target.result})`;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

imageUrlInput.addEventListener("input", function() {
  if (this.value.trim() !== "") {
    imagePreview.style.backgroundImage = `url(${this.value.trim()})`;
    imagePreview.style.display = "block";
  }
});

recipeForm.addEventListener("submit", function(e) {
  e.preventDefault();

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
  if (editingId) updateRecipe(recipe);
  else addRecipe(recipe);

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

  recipeFormSection.classList.remove("hide-box");
}

function deleteRecipe(id) {
  if (!confirm("Are you sure?")) return;
  removeRecipe(id);
  renderRecipes();
}

function showDetail(id) {
  const r = getRecipes().find(x => x.id === id);

  detailContent.innerHTML = `
    <h2>${escapeHtml(r.title)}</h2>
    <img src="${r.imageUrl}" style="width:100%; max-height:250px; object-fit:cover; margin-bottom:10px;">
    <p><strong>Description:</strong> ${escapeHtml(r.description)}</p>

    <h4>Ingredients:</h4>
    <ul>${r.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>

    <h4>Steps:</h4>
    <ol>${r.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>

    <p><strong>Prep:</strong> ${r.prepTime} mins</p>
  `;

  detailModal.classList.remove("hide-box");
}

closeDetail.addEventListener("click", () => detailModal.classList.add("hide-box"));

detailModal.addEventListener("click", e => {
  if (e.target === detailModal) detailModal.classList.add("hide-box");
});

searchInput.addEventListener("input", renderRecipes);
difficultyFilter.addEventListener("change", renderRecipes);
timeFilter.addEventListener("input", renderRecipes);

document.getElementById("backBtn").addEventListener("click", () => {
  searchInput.value = "";
  difficultyFilter.value = "all";
  timeFilter.value = "";
  renderRecipes();
});

renderRecipes();
