var express = require('express');
var router = express.Router();
var uuidGen = require('uuid/v4');

//REST
//post  -- ingresar
//get -- consultar
//delete -- borrar
//put -- modificar

router.get('/about', 
  function( req, res, next ){
    console.log("Entro en About con metodo GET");
    res.json(
      {"version":"1.0", "name":"Service Log Manager API"}
    );
  }
 );

 let logs = [];

 let contactos = {
   "_id":"",
    "nombre":"",
    "apellido":"",
    "correo":"",
    "telefono":""
 };

 logs.push(
    Object.assign( {}, contactos, {
      "_id": uuidGen(),
      "nombre":"",
      "apellido":"",
      "correo":"",
      "telefono":""
    })
  );

  logs.push(Object.assign({}, contactos, {
    "_id" : uuidGen(),
    "nombre":"",
    "apellido":"",
    "correo":"",
    "telefono":"",
     status:3,
     "closed":true
   }));

   router.get('/logs', function( req, res, next ){
    res.json(logs);
  }); // get /logs

  router.get('/logs/:_id', function( req, res, next ){
    var _id = req.params._id;
    var selected = logs.filter(function(currentItem, index){
      return currentItem._id === _id;
    });
  
    res.json(selected);
  } );


  router.post('/logs/new', function( req, res, next) {
    var logsParams = req.body;
    var newItem = Object.assign({},
      logItem, {
        "_id": uuidGen(),
        "nombre":"",
        "apellido":"",
        "correo":"",
        "telefono":""
      }
      );
    logs.push(newItem);
    res.json(newItem);
  }); // post /logs/new

  router.put('/logs/update/:_id', function(req, res, next){
    var _id = req.params._id;
    var itemToSend = {};
    logs = logs.map(function( currentItem, index){
      if( currentItem._id === _id ){
        currentItem = Object.assign({}, currentItem, req.body);
        itemToSend = currentItem;
      }
      return currentItem;
    });
    res.json(itemToSend);
  }
  ); // update _id put
  
  router.delete('/logs/delete/:_id', function(req, res, next){
    var _id = req.params._id;
    logs = logs.filter(function( currentItem, index){
      return currentItem._id !== _id;
    });
    res.json({"newArrayLength": logs.length });
  }
  ); // delete _id delete
  
  module.exports = router;
