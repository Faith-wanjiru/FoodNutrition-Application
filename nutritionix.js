const appId = 'c8546fb1';
const apiKey = 'f59dc49d3ee427581cb622c6b94f61d4';
const getResults = document.getElementById('searchedItem');
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
