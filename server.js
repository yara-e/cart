const express = require("express");
const bodyParser = require('body-parser')
const { CartController } = require('./controllers/cartcontroller')
const { ProductControllers } = require("./controllers/productcontroller");
//const { websiteApp } = require("./Routes/Website");

const App = express();
App.use(bodyParser.json())

let productController = new ProductControllers();
let CartControllers = new CartController();
App.post('/cart/:id', CartControllers.create)
App.put('/cart/:id/:pid', CartControllers.add)
App.post('/cart/:id/:pid', CartControllers.inc)
App.post('/cart/:id/:pid', CartControllers.dec)
App.put('/recart/:id/:pid', CartControllers.remove)
App.post("/cart/:id", CartControllers.viewOne);
App.post("/price/:id", CartControllers.subtotal);
App.post("/ship/:id", CartControllers.shipping);
App.post("/totalprice/:id", CartControllers.total);


const Port = 8076;
App.listen(Port, function () {
    console.log("app start and listen to port " + Port)
})