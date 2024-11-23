const APP_ID = '4216534b'; 
const APP_KEY = 'f3c4ac65024875691a60c0cec61f51ab'; 

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    fetchRecipes(searchInput);
});

async function fetchRecipes(query) {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        recipeContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(item => {
        const recipe = item.recipe;
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h2>${recipe.label}</h2>
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${recipe.url}</p>
        `;

        recipeContainer.appendChild(recipeCard);
    });
}