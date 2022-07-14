import express from "express";
import ProductManager from './managers/productManager.js'

const products = new ProductManager();
const app = express(); 
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})

function productsView(products){
    let string=''
    for(const product of products){
        string +=` 
        <h1>${product.name}</h1>
        <h3>$${product.price}</h3>
        <img style='width:300px' src='${product.thumbnail}'></img>
        <br>
        <br>
        `
    }
    return string
}

app.get("/productos",async(req,res)=>{
    let productsList= await products.getAll();
    res.send(productsView(productsList))
})

app.get('/productoRandom', async(req, res)=>{
    try {
        if(await products.getRandom()===0){
            res.send('No products')
        }else{
            let randomProduct= await products.getRandom()            
            res.send(productsView([randomProduct]))
        }
    } catch (error) {
        console.log(error)
    }
})