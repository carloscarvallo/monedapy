var express = require('express'),
    cotizacion = require('./src/cotizacion'),
    app = express(),
    port = process.env.PORT || 8080;

var router = express.Router();

setInterval(cotizacion(), 600000);

router.get('/', function(req, res) {
    res.json(cotizaciones);
});

app.use('/api', router);

app.listen(port, function () {
  console.log('Server Running at port:', port);
});
