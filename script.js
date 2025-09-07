// Global variables for tracking
let dailyFoods = [];
let currentCalories = 0;
let dailyGoal = 2000;
let nutritionData = {};
let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
let mealHistory = JSON.parse(localStorage.getItem('mealHistory')) || [];

// Global function for mobile menu toggle (fallback for mobile devices)
function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Free nutrition database (simplified USDA data)
const nutritionDB = {
    'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
    'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
    'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
    'oats': { calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10 },
    'salmon': { calories: 208, protein: 20, carbs: 0, fat: 12, fiber: 0 },
    'avocado': { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
    'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
    'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
    'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    'garlic': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1 },
    'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
    'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
    'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8 },
    'beef': { calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0 },
    'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8 },
    'cheese': { calories: 113, protein: 7, carbs: 1, fat: 9, fiber: 0 },
    'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1, fiber: 0 },
    'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7 },
    'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
    'orange': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4 },
    'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2 },
    'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, fiber: 1.3 },
    'cucumber': { calories: 16, protein: 0.7, carbs: 4, fat: 0.1, fiber: 0.5 }
};

// Development mode detection
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    updateDailySummary();
    displayMealHistory();
    initNavigation();
    initContactForm();
    
    // Clear service worker cache in development
    if (isDevelopment && 'serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister();
            }
        });
    }
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        // Add click event
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Add touch event for mobile devices
        navToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission (in real app, this would send to server)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>⏳</span> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! We\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Save to localStorage for demo purposes
                const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                messages.push({
                    ...formData,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
            }, 2000);
        });
    }
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// AI Recipe Generation (Free Local Algorithm)
function generateRecipe() {
    const ingredients = document.getElementById('ingredients').value;
    const caloriesTarget = parseInt(document.getElementById('calories-target').value) || 400;
    const cuisine = document.getElementById('cuisine-type').value;
    
    // Get dietary restrictions
    const restrictions = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        restrictions.push(checkbox.value);
    });

    if (!ingredients.trim()) {
        alert('Please enter some ingredients!');
        return;
    }

    // Show loading
    document.getElementById('recipe-output').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <div style="margin-left: 15px;">Generating AI Recipe...</div>
        </div>
    `;

    // Simulate AI processing (in real app, this would call free AI APIs)
    setTimeout(() => {
        const recipe = generateAIRecipe(ingredients, restrictions, caloriesTarget, cuisine);
        displayRecipe(recipe);
    }, 2000);
}

function generateAIRecipe(ingredients, restrictions, calories, cuisine) {
    const ingredientList = ingredients.split(',').map(i => i.trim());
    
    // Enhanced AI-like recipe generation logic
    const recipes = {
        default: {
            name: `${ingredientList[0]} Delight`,
            cookTime: '25 minutes',
            difficulty: 'Easy',
            instructions: [
                `Prepare ${ingredientList[0]} by washing and chopping into bite-sized pieces`,
                `Heat oil in a large pan over medium-high heat`,
                `Add ${ingredientList.join(', ')} and cook for 10-15 minutes`,
                'Season with salt, pepper, and your favorite spices',
                'Cook until tender and serve hot'
            ]
        },
        italian: {
            name: `Italian ${ingredientList[0]} Pasta`,
            cookTime: '30 minutes',
            difficulty: 'Medium',
            instructions: [
                `Cook pasta according to package directions`,
                `Sauté ${ingredientList[0]} in olive oil with garlic`,
                `Add remaining ingredients: ${ingredientList.slice(1).join(', ')}`,
                'Season with Italian herbs and parmesan cheese',
                'Toss with cooked pasta and serve'
            ]
        },
        asian: {
            name: `Asian ${ingredientList[0]} Stir-Fry`,
            cookTime: '20 minutes',
            difficulty: 'Easy',
            instructions: [
                `Cut ${ingredientList[0]} into thin strips`,
                `Heat wok or large pan with sesame oil`,
                `Stir-fry ${ingredientList.join(', ')} for 5-7 minutes`,
                'Add soy sauce, ginger, and garlic',
                'Serve over rice or noodles'
            ]
        }
    };

    // Generate nutrition info
    const nutrition = calculateNutrition(ingredientList, 1);
    
    return {
        ...(recipes[cuisine] || recipes.default),
        nutrition,
        restrictions,
        cuisine: cuisine || 'International',
        ingredients: ingredientList,
        id: Date.now()
    };
}

function displayRecipe(recipe) {
    const output = document.getElementById('recipe-output');
    const isFavorite = favoriteRecipes.some(fav => fav.id === recipe.id);
    
    output.innerHTML = `
        <div class="recipe-card">
            <div class="recipe-header">
                <h3>${recipe.name}</h3>
                <div style="display: flex; justify-content: space-around; margin-top: 15px;">
                    <div>⏱️ ${recipe.cookTime}</div>
                    <div>👨‍🍳 ${recipe.difficulty}</div>
                    <div>🌍 ${recipe.cuisine}</div>
                </div>
            </div>
            <div class="recipe-content">
                <h4>Ingredients:</h4>
                <ul style="margin: 10px 0;">
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                
                <h4>Instructions:</h4>
                <ol style="margin: 15px 0;">
                    ${recipe.instructions.map(step => `<li style="margin: 10px 0;">${step}</li>`).join('')}
                </ol>
                
                <h4>Nutrition per Serving:</h4>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <div class="nutrition-value">${Math.round(recipe.nutrition.calories)}</div>
                        <div class="nutrition-label">Calories</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${Math.round(recipe.nutrition.protein)}g</div>
                        <div class="nutrition-label">Protein</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${Math.round(recipe.nutrition.carbs)}g</div>
                        <div class="nutrition-label">Carbs</div>
                    </div>
                    <div class="nutrition-item">
                        <div class="nutrition-value">${Math.round(recipe.nutrition.fat)}g</div>
                        <div class="nutrition-label">Fat</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; display: flex; gap: 10px;">
                    <button class="btn btn-small" onclick="addToMealPlan('${recipe.name}')">
                        📅 Add to Meal Plan
                    </button>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id})">
                        ${isFavorite ? '❤️' : '🤍'} ${isFavorite ? 'Favorited' : 'Favorite'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Meal Planning Functions
function generateMealPlan() {
    const dailyCalories = parseInt(document.getElementById('daily-calories').value) || 2000;
    const mealsPerDay = parseInt(document.getElementById('meals-per-day').value) || 3;
    
    const mealPlan = createWeeklyMealPlan(dailyCalories, mealsPerDay);
    displayMealPlan(mealPlan);
    generateShoppingList(mealPlan);
}

function createWeeklyMealPlan(dailyCalories, mealsPerDay) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealTypes = mealsPerDay === 3 ? ['Breakfast', 'Lunch', 'Dinner'] :
                     mealsPerDay === 4 ? ['Breakfast', 'Lunch', 'Snack', 'Dinner'] :
                     ['Breakfast', 'Snack', 'Lunch', 'Snack', 'Dinner'];
    
    const mealPlan = {};
    
    days.forEach(day => {
        mealPlan[day] = {};
        mealTypes.forEach(mealType => {
            const calories = getMealCalories(mealType, dailyCalories, mealsPerDay);
            mealPlan[day][mealType] = generateMeal(mealType, calories);
        });
    });
    
    return mealPlan;
}

function getMealCalories(mealType, dailyCalories, mealsPerDay) {
    const calorieDistribution = {
        'Breakfast': 0.25,
        'Lunch': 0.35,
        'Dinner': 0.35,
        'Snack': 0.05
    };
    
    return Math.round(dailyCalories * calorieDistribution[mealType] || 0.1);
}

function generateMeal(mealType, targetCalories) {
    const mealOptions = {
        'Breakfast': [
            'Oatmeal with berries and honey',
            'Scrambled eggs with toast',
            'Greek yogurt parfait',
            'Avocado toast with egg',
            'Smoothie bowl with granola'
        ],
        'Lunch': [
            'Grilled chicken salad',
            'Quinoa bowl with vegetables',
            'Turkey and avocado wrap',
            'Lentil soup with bread',
            'Salmon with sweet potato'
        ],
        'Dinner': [
            'Baked salmon with rice',
            'Chicken stir-fry with noodles',
            'Vegetable pasta',
            'Beef and broccoli',
            'Fish tacos with slaw'
        ],
        'Snack': [
            'Apple with almond butter',
            'Greek yogurt with nuts',
            'Hummus with vegetables',
            'Trail mix',
            'Cheese and crackers'
        ]
    };
    
    const options = mealOptions[mealType] || mealOptions['Snack'];
    const randomMeal = options[Math.floor(Math.random() * options.length)];
    
    return {
        name: randomMeal,
        calories: targetCalories,
        ingredients: extractIngredients(randomMeal)
    };
}

function extractIngredients(mealName) {
    // Simple ingredient extraction based on meal name
    const ingredientMap = {
        'oatmeal': ['oats', 'milk', 'honey'],
        'eggs': ['egg', 'butter'],
        'yogurt': ['milk', 'berries'],
        'salad': ['lettuce', 'tomato', 'cucumber'],
        'chicken': ['chicken breast', 'olive oil'],
        'salmon': ['salmon', 'olive oil'],
        'pasta': ['pasta', 'tomato', 'garlic'],
        'rice': ['rice', 'olive oil'],
        'soup': ['onion', 'carrot', 'garlic'],
        'wrap': ['bread', 'lettuce', 'tomato'],
        'smoothie': ['banana', 'milk', 'berries'],
        'toast': ['bread', 'butter'],
        'quinoa': ['quinoa', 'vegetables'],
        'lentil': ['lentils', 'onion', 'carrot'],
        'stir-fry': ['vegetables', 'soy sauce', 'garlic'],
        'tacos': ['tortilla', 'lettuce', 'tomato'],
        'hummus': ['chickpeas', 'olive oil', 'garlic'],
        'trail mix': ['nuts', 'dried fruit'],
        'crackers': ['bread', 'cheese']
    };
    
    const ingredients = [];
    Object.keys(ingredientMap).forEach(key => {
        if (mealName.toLowerCase().includes(key)) {
            ingredients.push(...ingredientMap[key]);
        }
    });
    
    return ingredients.length > 0 ? ingredients : ['mixed ingredients'];
}

function displayMealPlan(mealPlan) {
    const output = document.getElementById('meal-plan-output');
    const days = Object.keys(mealPlan);
    
    output.innerHTML = `
        <div class="meal-plan-calendar">
            ${days.map(day => `
                <div class="day-card">
                    <div class="day-header">${day}</div>
                    ${Object.entries(mealPlan[day]).map(([mealType, meal]) => `
                        <div class="meal-slot" onclick="editMeal('${day}', '${mealType}')">
                            <strong>${mealType}</strong><br>
                            ${meal.name}<br>
                            <small>${meal.calories} cal</small>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 20px; text-align: center;">
            <button class="export-btn" onclick="exportMealPlan()">📋 Export Meal Plan</button>
            <button class="export-btn" onclick="printMealPlan()">🖨️ Print Meal Plan</button>
        </div>
    `;
}

// Calorie Tracking Functions
function addFoodItem() {
    const foodItem = document.getElementById('food-item').value;
    const portionSize = parseInt(document.getElementById('portion-size').value);
    const mealType = document.getElementById('meal-type').value;
    
    if (!foodItem || !portionSize) {
        alert('Please enter both food item and portion size!');
        return;
    }
    
    const nutrition = getNutritionInfo(foodItem, portionSize);
    if (!nutrition) {
        alert('Food item not found in database. Please try a different item.');
        return;
    }
    
    const foodEntry = {
        id: Date.now(),
        name: foodItem,
        portion: portionSize,
        mealType: mealType,
        nutrition: nutrition,
        timestamp: new Date().toISOString()
    };
    
    dailyFoods.push(foodEntry);
    currentCalories += nutrition.calories;
    
    // Save to localStorage
    saveUserData();
    
    // Update display
    updateDailySummary();
    displayFoodHistory();
    
    // Clear form
    document.getElementById('food-item').value = '';
    document.getElementById('portion-size').value = '';
}

function getNutritionInfo(foodItem, portionSize) {
    const normalizedName = foodItem.toLowerCase().trim();
    
    // Try exact match first
    if (nutritionDB[normalizedName]) {
        const baseNutrition = nutritionDB[normalizedName];
        return {
            calories: Math.round((baseNutrition.calories * portionSize) / 100),
            protein: Math.round((baseNutrition.protein * portionSize) / 100 * 10) / 10,
            carbs: Math.round((baseNutrition.carbs * portionSize) / 100 * 10) / 10,
            fat: Math.round((baseNutrition.fat * portionSize) / 100 * 10) / 10,
            fiber: Math.round((baseNutrition.fiber * portionSize) / 100 * 10) / 10
        };
    }
    
    // Try partial match
    for (const [key, value] of Object.entries(nutritionDB)) {
        if (normalizedName.includes(key) || key.includes(normalizedName)) {
            const baseNutrition = value;
            return {
                calories: Math.round((baseNutrition.calories * portionSize) / 100),
                protein: Math.round((baseNutrition.protein * portionSize) / 100 * 10) / 10,
                carbs: Math.round((baseNutrition.carbs * portionSize) / 100 * 10) / 10,
                fat: Math.round((baseNutrition.fat * portionSize) / 100 * 10) / 10,
                fiber: Math.round((baseNutrition.fiber * portionSize) / 100 * 10) / 10
            };
        }
    }
    
    return null;
}

function updateDailySummary() {
    const summaryDiv = document.getElementById('daily-summary');
    const progress = Math.min((currentCalories / dailyGoal) * 100, 100);
    
    summaryDiv.innerHTML = `
        <div class="progress-ring">
            <svg>
                <circle class="progress-ring-circle" cx="60" cy="60" r="52"></circle>
                <circle class="progress-ring-progress" cx="60" cy="60" r="52" 
                        style="stroke-dasharray: 326.7; stroke-dashoffset: ${326.7 - (326.7 * progress / 100)}"></circle>
            </svg>
            <div class="progress-text">
                <div class="progress-value">${currentCalories}</div>
                <div class="progress-label">of ${dailyGoal} cal</div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <p><strong>Daily Goal:</strong> ${dailyGoal} calories</p>
            <p><strong>Remaining:</strong> ${Math.max(0, dailyGoal - currentCalories)} calories</p>
        </div>
    `;
    
    updateNutritionBreakdown();
}

function updateNutritionBreakdown() {
    const breakdownDiv = document.getElementById('nutrition-breakdown');
    
    if (dailyFoods.length === 0) {
        breakdownDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #718096;">
                <div style="font-size: 3rem; margin-bottom: 20px;">📊</div>
                <p>Add food items to see your nutrition breakdown!</p>
            </div>
        `;
        return;
    }
    
    const totals = dailyFoods.reduce((acc, food) => {
        acc.calories += food.nutrition.calories;
        acc.protein += food.nutrition.protein;
        acc.carbs += food.nutrition.carbs;
        acc.fat += food.nutrition.fat;
        acc.fiber += food.nutrition.fiber;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
    
    breakdownDiv.innerHTML = `
        <h4>Today's Nutrition Summary</h4>
        <div class="nutrition-grid">
            <div class="nutrition-item">
                <div class="nutrition-value">${Math.round(totals.calories)}</div>
                <div class="nutrition-label">Calories</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${Math.round(totals.protein)}g</div>
                <div class="nutrition-label">Protein</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${Math.round(totals.carbs)}g</div>
                <div class="nutrition-label">Carbs</div>
            </div>
            <div class="nutrition-item">
                <div class="nutrition-value">${Math.round(totals.fat)}g</div>
                <div class="nutrition-label">Fat</div>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <h4>Food History</h4>
            <div id="food-history"></div>
        </div>
    `;
    
    displayFoodHistory();
}

function displayFoodHistory() {
    const historyDiv = document.getElementById('food-history');
    if (!historyDiv) return;
    
    if (dailyFoods.length === 0) {
        historyDiv.innerHTML = '<p style="color: #718096; text-align: center;">No food items added today.</p>';
        return;
    }
    
    historyDiv.innerHTML = dailyFoods.map(food => `
        <div class="food-item">
            <div class="food-info">
                <div class="food-name">${food.name}</div>
                <div class="food-details">${food.portion}g • ${food.mealType}</div>
            </div>
            <div class="food-calories">${food.nutrition.calories} cal</div>
            <button class="delete-btn" onclick="removeFoodItem(${food.id})">✕</button>
        </div>
    `).join('');
}

function removeFoodItem(foodId) {
    const foodIndex = dailyFoods.findIndex(food => food.id === foodId);
    if (foodIndex !== -1) {
        const food = dailyFoods[foodIndex];
        currentCalories -= food.nutrition.calories;
        dailyFoods.splice(foodIndex, 1);
        
        saveUserData();
        updateDailySummary();
        displayFoodHistory();
    }
}

// Nutrition Analysis Functions
function analyzeNutrition() {
    const ingredients = document.getElementById('recipe-ingredients').value;
    const servings = parseInt(document.getElementById('servings').value) || 1;
    
    if (!ingredients.trim()) {
        alert('Please enter recipe ingredients!');
        return;
    }
    
    const nutrition = calculateNutrition(ingredients.split('\n'), servings);
    displayNutritionAnalysis(nutrition, servings);
}

function calculateNutrition(ingredients, servings) {
    let totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    
    ingredients.forEach(ingredient => {
        const parts = ingredient.trim().split(' ');
        if (parts.length < 2) return;
        
        const quantity = parseFloat(parts[0]) || 1;
        const unit = parts[1];
        const foodName = parts.slice(2).join(' ').toLowerCase();
        
        // Convert units to grams (simplified)
        let grams = quantity;
        if (unit.includes('cup')) grams *= 150;
        else if (unit.includes('tbsp')) grams *= 15;
        else if (unit.includes('tsp')) grams *= 5;
        else if (unit.includes('lb')) grams *= 454;
        else if (unit.includes('oz')) grams *= 28;
        
        // Find nutrition info
        for (const [key, value] of Object.entries(nutritionDB)) {
            if (foodName.includes(key) || key.includes(foodName)) {
                totalNutrition.calories += (value.calories * grams) / 100;
                totalNutrition.protein += (value.protein * grams) / 100;
                totalNutrition.carbs += (value.carbs * grams) / 100;
                totalNutrition.fat += (value.fat * grams) / 100;
                totalNutrition.fiber += (value.fiber * grams) / 100;
                break;
            }
        }
    });
    
    // Divide by servings
    return {
        calories: Math.round(totalNutrition.calories / servings),
        protein: Math.round(totalNutrition.protein / servings * 10) / 10,
        carbs: Math.round(totalNutrition.carbs / servings * 10) / 10,
        fat: Math.round(totalNutrition.fat / servings * 10) / 10,
        fiber: Math.round(totalNutrition.fiber / servings * 10) / 10
    };
}

function displayNutritionAnalysis(nutrition, servings) {
    const output = document.getElementById('nutrition-analysis-output');
    
    output.innerHTML = `
        <div class="card">
            <h3>📊 Nutrition Analysis Results</h3>
            <div class="nutrition-grid">
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.calories}</div>
                    <div class="nutrition-label">Calories per Serving</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.protein}g</div>
                    <div class="nutrition-label">Protein</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.carbs}g</div>
                    <div class="nutrition-label">Carbohydrates</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.fat}g</div>
                    <div class="nutrition-label">Fat</div>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
                <h4>Total Recipe Nutrition (${servings} servings):</h4>
                <p><strong>Total Calories:</strong> ${nutrition.calories * servings}</p>
                <p><strong>Total Protein:</strong> ${nutrition.protein * servings}g</p>
                <p><strong>Total Carbs:</strong> ${nutrition.carbs * servings}g</p>
                <p><strong>Total Fat:</strong> ${nutrition.fat * servings}g</p>
            </div>
        </div>
    `;
}

// Shopping List Functions
function generateShoppingList(mealPlan) {
    const allIngredients = new Set();
    
    Object.values(mealPlan).forEach(day => {
        Object.values(day).forEach(meal => {
            meal.ingredients.forEach(ingredient => {
                allIngredients.add(ingredient);
            });
        });
    });
    
    const categorizedIngredients = categorizeIngredients(Array.from(allIngredients));
    displayShoppingList(categorizedIngredients);
}

function categorizeIngredients(ingredients) {
    const categories = {
        'Proteins': [],
        'Vegetables': [],
        'Grains': [],
        'Dairy': [],
        'Pantry': [],
        'Other': []
    };
    
    const categoryMap = {
        'chicken': 'Proteins',
        'beef': 'Proteins',
        'salmon': 'Proteins',
        'egg': 'Proteins',
        'turkey': 'Proteins',
        'fish': 'Proteins',
        'broccoli': 'Vegetables',
        'spinach': 'Vegetables',
        'lettuce': 'Vegetables',
        'tomato': 'Vegetables',
        'onion': 'Vegetables',
        'garlic': 'Vegetables',
        'carrot': 'Vegetables',
        'cucumber': 'Vegetables',
        'rice': 'Grains',
        'pasta': 'Grains',
        'bread': 'Grains',
        'oats': 'Grains',
        'quinoa': 'Grains',
        'milk': 'Dairy',
        'cheese': 'Dairy',
        'yogurt': 'Dairy',
        'olive oil': 'Pantry',
        'honey': 'Pantry',
        'soy sauce': 'Pantry',
        'salt': 'Pantry',
        'pepper': 'Pantry'
    };
    
    ingredients.forEach(ingredient => {
        let categorized = false;
        for (const [key, category] of Object.entries(categoryMap)) {
            if (ingredient.toLowerCase().includes(key)) {
                categories[category].push(ingredient);
                categorized = true;
                break;
            }
        }
        if (!categorized) {
            categories['Other'].push(ingredient);
        }
    });
    
    return categories;
}

function displayShoppingList(categories) {
    const output = document.getElementById('shopping-list-output');
    
    output.innerHTML = `
        <div class="shopping-list">
            ${Object.entries(categories).map(([category, items]) => `
                <div class="shopping-category">
                    <h4>🛒 ${category}</h4>
                    <div class="shopping-items">
                        ${items.map(item => `
                            <div class="shopping-item">
                                <input type="checkbox" id="item-${item}">
                                <label for="item-${item}">${item}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            <div style="margin-top: 20px; text-align: center;">
                <button class="export-btn" onclick="exportShoppingList()">📋 Export List</button>
                <button class="export-btn" onclick="printShoppingList()">🖨️ Print List</button>
            </div>
        </div>
    `;
    
    document.getElementById('results').style.display = 'block';
}

// Utility Functions
function addToMealPlan(recipeName) {
    alert(`"${recipeName}" has been added to your meal plan!`);
    // In a real app, this would add to the meal planner
}

function toggleFavorite(recipeId) {
    const recipe = favoriteRecipes.find(fav => fav.id === recipeId);
    if (recipe) {
        favoriteRecipes = favoriteRecipes.filter(fav => fav.id !== recipeId);
    } else {
        // Add to favorites (in real app, would get recipe data)
        favoriteRecipes.push({ id: recipeId, name: 'Recipe', timestamp: Date.now() });
    }
    
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    
    // Refresh the recipe display
    const favoriteBtn = document.querySelector('.favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.classList.toggle('active');
        favoriteBtn.innerHTML = favoriteBtn.classList.contains('active') ? 
            '❤️ Favorited' : '🤍 Favorite';
    }
}

function editMeal(day, mealType) {
    const newMeal = prompt(`Edit ${mealType} for ${day}:`);
    if (newMeal) {
        alert(`Updated ${mealType} for ${day} to: ${newMeal}`);
    }
}

function exportMealPlan() {
    const mealPlanData = document.getElementById('meal-plan-output').innerText;
    downloadAsFile(mealPlanData, 'meal-plan.txt', 'text/plain');
}

function exportShoppingList() {
    const shoppingData = document.getElementById('shopping-list-output').innerText;
    downloadAsFile(shoppingData, 'shopping-list.txt', 'text/plain');
}

function printMealPlan() {
    window.print();
}

function printShoppingList() {
    window.print();
}

function downloadAsFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Data Persistence Functions
function saveUserData() {
    const userData = {
        dailyFoods: dailyFoods,
        currentCalories: currentCalories,
        dailyGoal: dailyGoal,
        favoriteRecipes: favoriteRecipes,
        mealHistory: mealHistory
    };
    localStorage.setItem('smartMealData', JSON.stringify(userData));
}

function loadUserData() {
    const savedData = localStorage.getItem('smartMealData');
    if (savedData) {
        const userData = JSON.parse(savedData);
        dailyFoods = userData.dailyFoods || [];
        currentCalories = userData.currentCalories || 0;
        dailyGoal = userData.dailyGoal || 2000;
        favoriteRecipes = userData.favoriteRecipes || [];
        mealHistory = userData.mealHistory || [];
    }
}

function displayMealHistory() {
    // This would display meal history in a dedicated section
    // For now, we'll just ensure the data is loaded
}

// Reset daily data (call this at midnight or when starting a new day)
function resetDailyData() {
    dailyFoods = [];
    currentCalories = 0;
    saveUserData();
    updateDailySummary();
}

// Set daily calorie goal
function setDailyGoal() {
    const newGoal = prompt('Enter your daily calorie goal:', dailyGoal);
    if (newGoal && !isNaN(newGoal)) {
        dailyGoal = parseInt(newGoal);
        saveUserData();
        updateDailySummary();
    }
}
