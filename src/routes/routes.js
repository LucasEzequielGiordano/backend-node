import { Router } from "express";
import ProductManager from '../managers/productManager.js'

const products = new ProductManager();

const router = Router();

function validate(req, res, next) {
  if (!req.body.name || !req.body.price || !req.body.thumbnail) {
    return res.status(400).send({ error: "There's a wrong value" });
  } else next();
}

router.get("/products", async (req, res) => {
  try {
    let productsOfData = await products.getAll();
    res.send({ productsOfData });
  } catch (error) {
    console.log(error);
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    let productByID = await products.getById(parseInt(req.params.id));
    res.send({ productByID });
  } catch (error) {
    console.log(error);
  }
});

router.post("/products", validate, async (req, res) => {
  try {
    let productId = await products.save(req.body);
    res.send({ productId });
  } catch (error) {
    console.log(error);
  }
});

router.put("/products/:id", validate, async (req, res) => {
  try {
    let newProduct = await products.modifiedById(
      parseInt(req.params.id),
      req.body.price,
      req.body.name,
      req.body.thumbnail
    );
    res.send({ newProduct });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    await products.deleteById(parseInt(req.params.id));
    res.send({ sucess: "Product removed" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
