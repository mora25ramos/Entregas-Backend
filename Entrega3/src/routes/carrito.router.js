const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Carrito de compras');
});

module.exports = router;
