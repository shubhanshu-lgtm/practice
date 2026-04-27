const NodeCache = require('node-cache');

// Cache for 5 minutes by default
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

module.exports = cache;
