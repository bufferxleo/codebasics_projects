const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { loadModel, getEstimatedPrice } = require('./util');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/get_location_names', (req, res) => {
    const locations = loadModel().locations;
    res.json({ location: locations });
});

app.post('/predict_home_price', (req, res) => {
    const { total_sqft, location, bhk, bath } = req.body;
    const estimatedPrice = getEstimatedPrice(location, total_sqft, bhk, bath);
    res.json({ estimated_price: estimatedPrice });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
