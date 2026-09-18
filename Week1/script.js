// ==========================================
// MEALMATE - JAVASCRIPT
// ==========================================


// ---------- GET HTML ELEMENTS ----------

const addMealBtn = document.getElementById("addMealBtn");
const mealList = document.getElementById("mealList");


// ---------- LOAD SAVED MEALS ----------

let meals = JSON.parse(localStorage.getItem("meals")) || [];


// ---------- DISPLAY MEALS ----------

function displayMeals() {

    // Clear existing content
    mealList.innerHTML = "";

    // If there are no meals
    if (meals.length === 0) {

        mealList.innerHTML = `
            <div class="empty-message">
                <p>No meals planned yet.</p>
                <p>Click <strong>+ Add Meal</strong> to create your first meal.</p>
            </div>
        `;

        updateStatistics();

        return;
    }


    // Display every meal
    meals.forEach(function(meal, index) {

        const mealCard = document.createElement("div");

        mealCard.className = "meal-card";

        mealCard.innerHTML = `
            <div>
                <h3>${meal.day}</h3>

                <p>
                    <strong>${meal.type}</strong>
                </p>

                <p>
                    🍽️ ${meal.name}
                </p>

                <p>
                    🥕 ${meal.ingredients}
                </p>
            </div>

            <button
                class="delete-btn"
                onclick="deleteMeal(${index})">
                Delete
            </button>
        `;

        mealList.appendChild(mealCard);

    });


    updateStatistics();
}


// ---------- ADD NEW MEAL ----------

function addMeal() {

    const mealName = prompt("Enter meal name:");

    if (!mealName) {
        return;
    }


    const day = prompt(
        "Enter day:\nMonday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday"
    );

    if (!day) {
        return;
    }


    const type = prompt(
        "Enter meal type:\nBreakfast, Lunch or Dinner"
    );

    if (!type) {
        return;
    }


    const ingredients = prompt(
        "Enter ingredients separated by commas:"
    );

    if (!ingredients) {
        return;
    }


    // Create meal object

    const newMeal = {

        name: mealName,

        day: capitalize(day),

        type: capitalize(type),

        ingredients: ingredients

    };


    // Add meal to array

    meals.push(newMeal);


    // Save to browser

    saveMeals();


    // Display updated meals

    displayMeals();


    alert("Meal added successfully! 🍱");
}


// ---------- DELETE MEAL ----------

function deleteMeal(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this meal?"
    );


    if (confirmDelete) {

        meals.splice(index, 1);

        saveMeals();

        displayMeals();

    }
}


// ---------- SAVE MEALS ----------

function saveMeals() {

    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );

}


// ---------- UPDATE STATISTICS ----------

function updateStatistics() {

    const mealCount = document.getElementById("mealCount");

    const ingredientCount =
        document.getElementById("ingredientCount");


    // Number of meals

    mealCount.textContent = meals.length;


    // Count ingredients

    let totalIngredients = 0;


    meals.forEach(function(meal) {

        const ingredients =
            meal.ingredients.split(",");

        totalIngredients += ingredients.length;

    });


    ingredientCount.textContent =
        totalIngredients;

}


// ---------- CAPITALIZE TEXT ----------

function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1).toLowerCase();

}


// ---------- RANDOM MEAL ----------

function randomMeal() {

    if (meals.length === 0) {

        alert(
            "You haven't added any meals yet. Add a meal first!"
        );

        return;
    }


    // Pick random meal

    const randomIndex =
        Math.floor(Math.random() * meals.length);


    const selectedMeal =
        meals[randomIndex];


    alert(
        "🍽️ You should eat:\n\n"
        + selectedMeal.name
        + "\n"
        + selectedMeal.type
        + " - "
        + selectedMeal.day
    );

}


// ---------- QUICK ACTION BUTTONS ----------

const quickCards =
    document.querySelectorAll(".quick-card");


if (quickCards.length >= 3) {

    // Add recipe

    quickCards[0].addEventListener(
        "click",
        function() {

            alert(
                "Recipe feature coming soon! 🍳"
            );

        }
    );


    // Grocery list

    quickCards[1].addEventListener(
        "click",
        function() {

            showGroceryList();

        }
    );


    // Random meal

    quickCards[2].addEventListener(
        "click",
        function() {

            randomMeal();

        }
    );

}


// ---------- GROCERY LIST ----------

function showGroceryList() {

    if (meals.length === 0) {

        alert(
            "No ingredients available yet."
        );

        return;
    }


    let groceryList =
        "🛒 YOUR GROCERY LIST\n\n";


    meals.forEach(function(meal) {

        groceryList +=
            "• " + meal.ingredients + "\n";

    });


    alert(groceryList);

}


// ---------- ADD MEAL BUTTON ----------

addMealBtn.addEventListener(
    "click",
    addMeal
);


// ---------- START APPLICATION ----------

displayMeals();