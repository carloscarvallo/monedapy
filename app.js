var express = require('express'),
    request = require('sync-request'),
    cheerio = require('cheerio'),
    app = express(),
    port = process.env.PORT || 8080;


var casas = [ 'http://www.cambioschaco.com.py/',
              'http://www.cambiosalberdi.com',
              'http://mydcambios.com.py/' ]


function cotizacion(){
var casa = casas.map(function(url){
    return cheerio.load(request('GET', url).getBody('utf8'));
  });

//Cambios Chaco

//Dolar
var dccompra = casa[0]('#exchange-usd span.purchase').text();
var dcventa = casa[0]('#exchange-usd span.sale').text();

//Peso
var pccompra = casa[0]('#exchange-ars span.purchase').text();
var pcventa = casa[0]('#exchange-ars span.sale').text();

//Real
var rccompra = casa[0]('#exchange-brl span.purchase').text();
var rcventa = casa[0]('#exchange-brl span.sale').text();

//Euro
var eccompra = casa[0]('#exchange-eur span.purchase').text();
var ecventa = casa[0]('#exchange-eur span.sale').text();

//Cambios Alberdi

//Dolar
var dacompra = casa[1](' .span2.pagination-right').first().text();
var daventa = casa[1](' .span2.pagination-right').eq(1).text();

//Peso
var pacompra = casa[1](' .span2.pagination-right').eq(2).text();
var paventa = casa[1](' .span2.pagination-right').eq(3).text();

//Real
var racompra = casa[1](' .span2.pagination-right').eq(4).text();
var raventa = casa[1](' .span2.pagination-right').eq(5).text();

//Euro
var eacompra = casa[1](' .span2.pagination-right').eq(6).text();
var eaventa = casa[1](' .span2.pagination-right').eq(7).text();

//M&D Cambios
//Dolar
var dmcompra = casa[2]('.text-right').eq(2).text().replace(",", ".").replace(".00", "");
var dmventa = casa[2]('.text-right').eq(3).text().replace(",", ".").replace(".00", "");

//Peso
var pmcompra = casa[2]('.text-right').eq(4).text().replace(",", ".").replace(".00", "");
var pmventa = casa[2]('.text-right').eq(5).text().replace(",", ".").replace(".00", "");

//Real
var rmcompra = casa[2]('.text-right').eq(6).text().replace(",", ".").replace(".00", "");
var rmventa = casa[2]('.text-right').eq(7).text().replace(",", ".").replace(".00", "");

//Euro
var emcompra = casa[2]('.text-right').eq(8).text().replace(",", ".").replace(".00", "");
var emventa = casa[2]('.text-right').eq(9).text().replace(",", ".").replace(".00", "");

cotizaciones = {
  'dolar':{
    'cambioschaco': {
      'compra': dccompra,
      'venta': dcventa
    },
    'cambiosalberdi':{
      'compra': dacompra,
      'venta': daventa
    },
    'mydcambios':{
      'compra': dmcompra,
      'venta': dmventa
    }
  },
  'peso':{
    'cambioschaco': {
      'compra': pccompra,
      'venta': pcventa
    },
    'cambiosalberdi':{
      'compra': pacompra,
      'venta': paventa
    },
    'mydcambios':{
      'compra': pmcompra,
      'venta': pmventa
    }
  },
  'real':{
    'cambioschaco': {
      'compra': rccompra,
      'venta': rcventa
    },
    'cambiosalberdi':{
      'compra': racompra,
      'venta': raventa
    },
    'mydcambios':{
      'compra': rmcompra,
      'venta': rmventa
    }
  },
  'euro':{
    'cambioschaco': {
      'compra': eccompra,
      'venta': ecventa
    },
    'cambiosalberdi':{
      'compra': eacompra,
      'venta': eaventa
    },
    'mydcambios':{
      'compra': emcompra,
      'venta': emventa
    }
  }
}
}


setInterval(cotizacion(), 600000)

app.get('/api', function (req, res) {
  res.json(cotizaciones)
})

app.listen(port, function () {
  console.log('Server Running')
});
