const appId = 'c8546fb1';
const apiKey = 'f59dc49d3ee427581cb622c6b94f61d4';

// Base endpoint for the API
const endpoint = 'https://trackapi.nutritionix.com/v2/search/instant';


// Function to fetch nutrition data
async function getFood(foodQuery) {
    const url = `${endpoint}?query=${encodeURIComponent(foodQuery)}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-app-id': appId,
                'x-app-key': apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('FoodData:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// Call the function with a food query

function results(data) {
    const getResults = document.getElementById('searchedItem');
    getResults.innerHTML = '';
    if (data.common && data.common.length > 0) {
        data.common.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `${item.food_name}: ${item.serving_qty} ${item.serving_unit} - ${item.nf_calories} calories`;
            getResults.appendChild(itemDiv);
        });
    } else {
        getResults.textContent = 'No results found';
    }
}
console.log(results)
// Function to display errors
function displayError(error) {
    const getResults = document.getElementById('results');
    getResults.innerHTML = '';
    getResults.textContent = `Error: ${error.message}`;
}
// Event listener for form submission
document.getElementById('search-bar').addEventListener('submit', function(event) {
    event.preventDefault();
    const food = document.getElementById('searchInput').value;
    getFood(food);
});

document.addEventListener('DOMContentLoaded', results);