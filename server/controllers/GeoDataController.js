const GeoData = require('../models/GeoData');

// Créer de nouvelles données géospatiales
const createGeoData = async (req, res) => {
  try {
    const newData = await GeoData.create(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les données géospatiales
const getAllGeoData = async (req, res) => {
  try {
    const allData = await GeoData.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createGeoData, getAllGeoData };
