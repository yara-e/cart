const { CartService } = require("../service/cartService");
const { insertOne } = require("../DB/Base");
const { cart } = require("../DB/cart");
const { Product } = require("../DB/Product");
const { ProductService } = require("../service/ProductService");

class CartController {

    async create(req, res) {
        let Cart = new cart();
        const id = req.params.id;
        await Cart.insertOne({

            "user_id": id,
            "items": [],
        });

        res.json({
            message: "cart created successfully"
        });
    }

    async add(req, res) {

        const id = req.params.id;
        const pid = req.params.pid;
        let pservice = new ProductService();
        let product = await pservice.one(pid)
        let cservice = new CartService()
        let car = await cservice.one(id)
        car.items.push({ "item": product, "qyt": 1 })
        res.json({
            car: await cservice.updateadd(id, car)

        });
    }
    async inc(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        let cservice = new CartService()
        let car = await cservice.one(id)
        let array = car.items
        let result;
        for (let i = 0; i < array.length; i++) {
            if (array[i].item._id == pid) {
                result = i;
            }
        }
        let quantity = car.items[result].qyt
        car.items[result].qyt = quantity + 1;

        res.json({
            car: await cservice.updateadd(id, car)
        });
    }
    async dec(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        let cservice = new CartService()
        let car = await cservice.one(id)
        let array = car.items
        let result;
        for (let i = 0; i < array.length; i++) {
            if (array[i].item._id == pid) {
                result = i;
            }
        }
        let quantity = car.items[result].qyt
        car.items[result].qyt = quantity - 1;

        res.json({
            car: await cservice.updateadd(id, car)
        });
    }
    async remove(req, res) {
        const id = req.params.id;
        const pid = req.params.pid;
        let pservice = new ProductService();
        let product = await pservice.one(pid)
        let cservice = new CartService()
        let car = await cservice.one(id)
        car.items.splice(product)
        res.json({
            car: await cservice.updateadd(id, car)

        });
    }
    async shipping(req, res) {
        const id = req.params.id;
        let service = new CartService()
        let cart = await service.one(id)
        let pc = 0;
        let array = cart.items
        for (var i = 0; i < array.length; i++) {
            pc += array[i].item.price * array[i].qyt;
        }
        let ship = pc * 0.1
        res.json({
            ship
        });

    }
    async subtotal(req, res) {
        const id = req.params.id;
        let service = new CartService()
        let cart = await service.one(id)
        let pc = 0;
        let array = cart.items
        for (var i = 0; i < array.length; i++) {
            pc += array[i].item.price * array[i].qyt;
        }

        res.json({
            pc
        });
    }


    async total(req, res) {
        const id = req.params.id;
        let service = new CartService()
        let cart = await service.one(id)
        let pc = 0;
        let array = cart.items
        for (var i = 0; i < array.length; i++) {
            pc += array[i].item.price * array[i].qyt;
        }
        let ship = pc * 0.1
        let total = pc + ship
        res.json({
            total
        });
    }
    async viewOne(req, res) {
        const id = req.params.id;

        let service = new CartService();
        res.json({
            cart: await service.one(id)
        });
    }
}

module.exports = {
    CartController
}