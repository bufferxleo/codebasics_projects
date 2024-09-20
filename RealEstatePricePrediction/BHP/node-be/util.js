const fs = require('fs');
const path = require('path');

// Mocked model data and columns for simplicity
let dataColumns = [];
let locations = [];
let model = null;

// Load model and artifacts (This is a simplified example)
function loadModel() {
    if (!model) {
        // Load the columns and locations
        const columns = JSON.parse(fs.readFileSync(path.join(__dirname, 'artifacts/columns.json')));
        dataColumns = columns['data_columns'];
        locations = dataColumns.slice(3);

        // Load the model (here it's just a mock, you'd replace this with real model logic)
        model = JSON.parse(fs.readFileSync(path.join(__dirname, 'artifacts/banglore_home_prices_model.json')));
    }

    return { dataColumns, locations, model };
}

// A simplified prediction function (you'd replace this with actual model logic)
function getEstimatedPrice(location, sqft, bhk, bath) {
    loadModel();

    let locIndex = dataColumns.indexOf(location.toLowerCase());
    let x = new Array(dataColumns.length).fill(0);
    x[0] = bhk;
    x[1] = sqft;
    x[2] = bath;
    if (locIndex >= 0) {
        x[locIndex] = 1;
    }

    // Simulate prediction with simple logic
    const price = x.reduce((sum, value, idx) => sum + value * model.coefficients[idx], 0);
    return parseFloat(price.toFixed(2));
}

module.exports = {
    loadModel,
    getEstimatedPrice
};
