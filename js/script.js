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

const detailModal = document.getElementById("recipeDetailModal");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");

let editingId = null;

function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text).replace(/&/g,"&amp;")
                     .replace(/</g,"&lt;")
                     .replace(/>/g,"&gt;")
                     .replace(/"/g,"&quot;")
                     .replace(/'/g,"&#039;");
}

function renderRecipes() {
  const recipes = getRecipes();
  const searchText = (searchInput?.value || "").toLowerCase();
  const diff = difficultyFilter?.value || "all";

  let filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(searchText)
  );

  if (diff !== "all") filtered = filtered.filter(r => r.difficulty === diff);

  recipeList.innerHTML = "";

  if (filtered.length === 0) {
    const msg = document.createElement("div");
    msg.textContent = "No recipes available.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "20px";
    msg.style.fontSize = "1.2rem";
    msg.style.color = "#333"; // visible color
    recipeList.appendChild(msg);
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${r.imageUrl || 'assets/default.jpg'}" alt="${escapeHtml(r.title)}" />
      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml(r.description)}</p>
      <div class="recipe-info">
        <span>Prep: ${r.prepTime} mins</span>
        <span>Difficulty: ${escapeHtml(r.difficulty)}</span>
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

  if (!titleInput.value.trim() ||
      !descriptionInput.value.trim() ||
      !ingredientsInput.value.trim() ||
      !stepsInput.value.trim() ||
      !prepTimeInput.value.trim()
  ) return alert("Please fill all required fields.");

  const recipeData = {
    id: editingId || Date.now(),
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    ingredients: ingredientsInput.value.split(",").map(i => i.trim()),
    steps: stepsInput.value.split("\n").map(s => s.trim()),
    prepTime: parseInt(prepTimeInput.value, 10) || 0,
    difficulty: difficultyInput.value,
    imageUrl: imageUrlInput.value.trim() || null
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
    if (!recipeData.imageUrl) recipeData.imageUrl = "assets/default.jpg";
    saveRecipeData(recipeData);
  }
});

function saveRecipeData(recipeData) {
  if (editingId) updateRecipe(recipeData);
  else addRecipe(recipeData);

  recipeFormSection.classList.add("hide-box");
  renderRecipes();
}

function editRecipe(id) {
  const r = getRecipes().find(x => x.id === id);
  if (!r) return alert("Recipe not found");

  editingId = id;
  formTitle.textContent = "Edit Recipe";

  titleInput.value = r.title || "";
  descriptionInput.value = r.description || "";
  ingredientsInput.value = (r.ingredients || []).join(", ");
  stepsInput.value = (r.steps || []).join("\n");
  prepTimeInput.value = r.prepTime || "";
  difficultyInput.value = r.difficulty || "easy";
  imageUrlInput.value = r.imageUrl && !r.imageUrl.startsWith("data:") ? r.imageUrl : "";

  if (r.imageUrl) {
    imagePreview.style.backgroundImage = `url(${r.imageUrl})`;
    imagePreview.style.display = "block";
  } else imagePreview.style.display = "none";

  recipeFormSection.classList.remove("hide-box");
}

function deleteRecipe(id) {
  if (!confirm("Are you sure you want to delete this recipe?")) return;
  removeRecipe(id);
  renderRecipes();
}

function showDetail(id) {
  const r = getRecipes().find(x => x.id === id);
  if (!r) return;
  detailContent.innerHTML = `
    <h2>${escapeHtml(r.title)}</h2>
    <img src="${r.imageUrl || 'assets/default.jpg'}" style="width:110%; max-height:250px; object-fit:cover; border-radius:8px; margin-bottom:8px;">
    <p><strong>Description:</strong> ${escapeHtml(r.description)}</p>
    <h4>Ingredients:</h4>
    <ul>${(r.ingredients || []).map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
    <h4>Steps:</h4>
    <ol>${(r.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
    <p><strong>Prep:</strong> ${r.prepTime} mins &nbsp; <strong>Difficulty:</strong> ${escapeHtml(r.difficulty)}</p>
  `;
  detailModal.classList.remove("hide-box");
}

closeDetail.addEventListener("click", () => detailModal.classList.add("hide-box"));
detailModal.addEventListener("click", e => { if(e.target === detailModal) detailModal.classList.add("hide-box"); });

if (searchInput) searchInput.addEventListener("input", renderRecipes);
if (difficultyFilter) difficultyFilter.addEventListener("change", renderRecipes);

renderRecipes();
