// Demo data for testing SmartMeal AI features
// This file contains sample data that can be used to test various features

const demoRecipes = [
    {
        name: "Mediterranean Chicken Bowl",
        ingredients: ["chicken breast", "olive oil", "tomato", "cucumber", "rice"],
        cuisine: "mediterranean",
        calories: 450,
        cookTime: "30 minutes",
        difficulty: "Easy"
    },
    {
        name: "Asian Vegetable Stir-Fry",
        ingredients: ["broccoli", "carrot", "garlic", "soy sauce", "rice"],
        cuisine: "asian",
        calories: 320,
        cookTime: "20 minutes",
        difficulty: "Easy"
    },
    {
        name: "Italian Pasta Primavera",
        ingredients: ["pasta", "tomato", "garlic", "olive oil", "cheese"],
        cuisine: "italian",
        calories: 380,
        cookTime: "25 minutes",
        difficulty: "Medium"
    }
];

const demoMealPlan = {
    "Monday": {
        "Breakfast": { name: "Oatmeal with berries", calories: 300, ingredients: ["oats", "milk", "berries"] },
        "Lunch": { name: "Grilled chicken salad", calories: 450, ingredients: ["chicken breast", "lettuce", "tomato"] },
        "Dinner": { name: "Salmon with sweet potato", calories: 500, ingredients: ["salmon", "sweet potato", "olive oil"] }
    },
    "Tuesday": {
        "Breakfast": { name: "Greek yogurt parfait", calories: 250, ingredients: ["yogurt", "granola", "honey"] },
        "Lunch": { name: "Quinoa bowl", calories: 400, ingredients: ["quinoa", "vegetables", "olive oil"] },
        "Dinner": { name: "Beef stir-fry", calories: 480, ingredients: ["beef", "broccoli", "soy sauce"] }
    }
};

const demoFoodItems = [
    { name: "Grilled Chicken Breast", portion: 150, mealType: "lunch", calories: 248 },
    { name: "Brown Rice", portion: 100, mealType: "lunch", calories: 111 },
    { name: "Broccoli", portion: 80, mealType: "lunch", calories: 27 },
    { name: "Greek Yogurt", portion: 200, mealType: "breakfast", calories: 130 },
    { name: "Banana", portion: 120, mealType: "snack", calories: 107 }
];

// Function to load demo data (for testing purposes)
function loadDemoData() {
    console.log("Loading demo data...");
    
    // Load demo recipes
    console.log("Demo Recipes:", demoRecipes);
    
    // Load demo meal plan
    console.log("Demo Meal Plan:", demoMealPlan);
    
    // Load demo food items
    console.log("Demo Food Items:", demoFoodItems);
    
    alert("Demo data loaded! Check the console for details.");
}

// Function to populate form with demo ingredients
function loadDemoIngredients() {
    const ingredientsTextarea = document.getElementById('ingredients');
    if (ingredientsTextarea) {
        ingredientsTextarea.value = "chicken breast, broccoli, rice, garlic, olive oil, tomato, onion";
    }
}

// Function to populate nutrition analysis with demo data
function loadDemoNutritionAnalysis() {
    const ingredientsTextarea = document.getElementById('recipe-ingredients');
    if (ingredientsTextarea) {
        ingredientsTextarea.value = "2 cups rice\n1 lb chicken breast\n1 tbsp olive oil\n2 cloves garlic\n1 cup broccoli\n1 medium tomato";
    }
    
    const servingsInput = document.getElementById('servings');
    if (servingsInput) {
        servingsInput.value = "4";
    }
}

// Add demo buttons to the page (call this function to add demo functionality)
function addDemoButtons() {
    const container = document.querySelector('.container');
    if (container) {
        const demoSection = document.createElement('div');
        demoSection.className = 'card';
        demoSection.style.marginTop = '20px';
        demoSection.innerHTML = `
            <h3><span class="icon">🧪</span>Demo & Testing</h3>
            <p>Use these buttons to quickly test the application with sample data:</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
                <button class="btn btn-small" onclick="loadDemoIngredients()">Load Demo Ingredients</button>
                <button class="btn btn-small" onclick="loadDemoNutritionAnalysis()">Load Demo Nutrition</button>
                <button class="btn btn-small" onclick="loadDemoData()">Load All Demo Data</button>
            </div>
        `;
        container.appendChild(demoSection);
    }
}

// Uncomment the line below to automatically add demo buttons when the page loads
// document.addEventListener('DOMContentLoaded', addDemoButtons);
