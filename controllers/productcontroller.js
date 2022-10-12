const { ProductService } = require("../service/ProductService");
const { insertOne } = require("../DB/Base");
const { Product } = require("../DB/Product");

class ProductControllers {

    async list(req, res) {
        let service = new ProductService();
        res.json({
            list: await service.list(req.user, req.page, 10)
        });
    }


    async viewOne(req, res) {
        const id = req.params.id;

        let service = new ProductService();
        res.json({
            product: await service.one(id)
        });
    }

    async create(req, res) {
        let product = new Product();
        let data = req.body;
        data.idDeleted = false;

        await product.insertOne(data);

        res.json({
            message: "product created successfully"
        });
    }



    async delete(req, res) {
        const { id } = req.params;

        let service = new ProductService();
        await service.delete(id)
        res.json({
            message: "product deleted successfully"
        });
    }


    async update(req, res) {

        const { id } = req.params;
        const { name, price, count } = req.body;

        let service = new ProductService();
        res.json({
            product: await service.update(id, { name, price, count })
        });
    }
}


module.exports = {
    ProductControllers
}