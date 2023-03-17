var express = require('express');
var router = express.Router();
const fetchData = require('../functions/fetch-data');
const getRegime = require('../functions/get-regime');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await fetchData("Regime Empresas.xlsx");
  // const responseData = await getRegime(data);
  console.log(data[0])
  res.render('regime', { qty: data.length, data: data });
});

module.exports = router;
