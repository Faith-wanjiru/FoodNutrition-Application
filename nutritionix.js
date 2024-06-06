const appId = 'c8546fb1';
const apiKey = 'f59dc49d3ee427581cb622c6b94f61d4';
const getResults = document.getElementById('searchedItem');
let isTextDisplayed = false;
const endpoint = 'https://trackapi.nutritionix.com/v2/search/instant';

async function getFood(foodQuery) {
    const url = `${endpoint}?query=${encodeURIComponent(foodQuery)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-app-id': appId,
            'x-app-key': apiKey
        },
        mode: 'cors'
    });
    if (response.status === 200) {
        const result = await response.json();
        return result;
    } else if (response.status === 204) {
        return [];
    } else {
        throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
    }
}
document.getElementById('search-bar').addEventListener('submit', async function(event) {
    event.preventDefault();
    const food = document.getElementById('searchInput').value;
    try {
        const data = await getFood(food);
        console.log(data);
        removeImages()
        displayText()
        displayResults(data);
    } catch (error) {
        console.log(error);
        displayError(error);
    }
});
function displayText() {
    const textDiv = document.getElementById("text");
    textDiv.innerHTML = ''; 
    const text = document.createElement('h2');
    text.textContent = "Results!";
    textDiv.appendChild(text);
    text.style.display = "block";
    isTextDisplayed = true;
}
function removeImages(){
    const allImages = document.getElementById('display')
    allImages.style.display = 'none';
}
function displayResults(data) {
    console.log('Received data:', data);
    const resultsContainer = document.getElementById('getResults');
    resultsContainer.innerHTML = '';
    if (data.common.length === 0 && data.branded.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.classList.add('no-results');
        noResultsMessage.textContent = 'No results found.';
        resultsContainer.appendChild(noResultsMessage);
    } else {
        data.common.forEach(item => {
            const singleItem = document.createElement('div');
            singleItem.classList.add('single-item');
            const image = document.createElement('img');
            image.src = item.photo.thumb;
            singleItem.appendChild(image);
            const foodComponents = document.createElement('div');
            foodComponents.classList.add('food-components');
            const foodName = document.createElement('h5');
            foodName.textContent = item.food_name;
            const servingInfo = document.createElement('p');
            servingInfo.textContent = `${item.serving_qty} ${item.serving_unit}`;
            const calorieInfo = document.createElement('p');
            calorieInfo.textContent = `Calories: ${item.nf_calories}`;
            foodComponents.appendChild(foodName);
            foodComponents.appendChild(servingInfo);
            foodComponents.appendChild(calorieInfo);
            singleItem.appendChild(foodComponents);
            resultsContainer.appendChild(singleItem);
        });
        if (data.branded.length > 0) {
            data.branded.forEach(item => {
                const singleItem = document.createElement('div');
                singleItem.classList.add('single-item');
                const image = document.createElement('img');
                image.src = item.photo.thumb;
                singleItem.appendChild(image);
                const foodComponents = document.createElement('div');
                foodComponents.classList.add('food-components');
                const foodName = document.createElement('h5');
                foodName.textContent = item.item_name;
                const servingInfo = document.createElement('p');
                servingInfo.textContent = `${item.serving_qty} ${item.serving_unit}`;
                const calorieInfo = document.createElement('p');
                calorieInfo.textContent = `Calories: ${item.nf_calories}`;
                foodComponents.appendChild(foodName);
                foodComponents.appendChild(servingInfo);
                foodComponents.appendChild(calorieInfo);
                singleItem.appendChild(foodComponents);
                resultsContainer.appendChild(singleItem);
            });
        }
    }
}
function displayError(error) {
    getResults.innerHTML = '';
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.textContent = `Error: ${error.message}`;
    getResults.appendChild(errorMessage);
}