import * as fs from 'fs'

const path = "./src/files/products.json" 

class ProductManager{

    getAll = async()=>{
        try {
            if(fs.existsSync(path)){
                let data= await fs.promises.readFile(path,"utf-8");
                let objectOfData = JSON.parse(data)
                return objectOfData
            }else{
                return [];
            }
        } catch (error) {
            console.log("The file couldn't be read: ",error);
        }     
    }

    save = async (object) => {        
        try {
            let product = await this.getAll();
            if (product.length===0){
                object.id= 1;
                product.push(object);
                await fs.promises.writeFile(path,JSON.stringify(product,null,"\t"));
                console.log("Product has been stored correctly")
            } else {
                object.id=product[product.length-1].id+1;
                product.push(object);
                await fs.promises.writeFile(path,JSON.stringify(product,null,"\t"));
                console.log("Product has been stored correctly")
            }          
        } catch (error) {
            console.log("The file couldn't be read: ",error);
        }
    }

    getById = async (id)=>{
        try {
            let productsOfData = await this.getAll();    
            let objetoById=productsOfData.find(item => item.id===id);
            if(objetoById!=undefined){
                return objetoById;
            }else{
                return null;
            }                                  
        } catch (error) {
            console.log("The file couldn't be read: ",error);
        }
    }

    deleteById = async (id)=>{
        try {
            let productsOfData = await this.getAll();    
            let index = productsOfData.findIndex(index=> index.id === id); 
            if(index!=-1){
            productsOfData.splice(index,1);
            await fs.promises.writeFile(path,JSON.stringify(productsOfData,null,"\t"));
            console.log("Product removed from your product list");
            }else{
                console.log("Product is not registered")
            }    
        } catch (error) {
            console.log("The file couldn't be read: ",error);
        }
    }

    deleteAll = async() =>{
        try {
            await fs.promises.unlink(path);
            console.log("Your product list has been completely removed")            
        } catch (error) {
            console.log("File could not be deleted: ",error);
        }
    }

    getRandom = async()=>{
        try {
            let products = await this.getAll()
            if(products.length===0){
                return 0;
            }else{
            let numberRandom = parseInt(Math.random() * (products.length) + 1)
            return products[numberRandom]
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductManager