const mongoose = require('mongoose');

// Modèle pour les données géospatiales
const geoDataSchema = new mongoose.Schema({
  type: String,
  features: [{
    type: mongoose.Schema.Types.Mixed // Stocker les objets GeoJSON comme des données mixtes
  }]
});

const GeoData = mongoose.model('GeoData', geoDataSchema);

module.exports = GeoData;
