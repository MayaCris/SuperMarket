import { Products } from "./products.js";
import { Utils } from "./utils.js";
import { Discount } from "./discount.js";

export class Cart {
    constructor(menu) {
        this.products = new Products();
        this.utils = new Utils();
        this.discount = new Discount();
        this.cart = [];
        this.menu = menu;
    }

    addProductstoCart() {
        this.selectCategory();
        this.selectProduct();
    }

    selectCategory() {
        let category = Number(prompt(
            "Ingrese la categoría del producto que desea agregar al carrito \n1. Alimentos \n2. Bebidas \n3. Cuidado Personal \n4. Regresar al menu principal"
        ));
        switch(category) {
            case 1:
                this.category = "Alimentos";
                break;
            case 2:
                this.category = "Bebidas";
                break;
            case 3:
                this.category = "Cuidado Personal";
                break;
            case 4:
                this.menu.mainMenu();
                break;
            default:
                alert("Opción no válida");
                this.selectCategory();
        }
    }
    selectProduct() {
        if(this.category) {
            this.showProducts();
            this.putProductInCart();
            this.addMoreProducts();
        } else {
            alert("Opción no válida");
            this.selectCategory();
        }
    }

    showProducts() {
        let productsFiltered = this.filterProducts();
        let productsToShow = productsFiltered.map((product, index) => {
            return `${index+1}. ${product.name} - $${product.price}`;
        }).join("\n");
        alert("Productos disponibles: \n" + productsToShow);
    }

    putProductInCart() {
        let productsFiltered = this.filterProducts();
        let numberProduct = Number(prompt("Ingrese el número del producto que desea agregar al carrito"));
        if ( numberProduct && numberProduct > 0 && numberProduct <= productsFiltered.length ){
            let productName = (productsFiltered[numberProduct-1]).name;
            let productPrice = (productsFiltered[numberProduct-1]).price;
            let productCategory = (productsFiltered[numberProduct-1]).category;
            let quantity = Number(prompt("Ingrese la cantidad de productos que desea agregar al carrito"));
            let discountPercentage = this.discount.calculateDiscount(productCategory, quantity)*100;
            discountPercentage = discountPercentage > 0 ? discountPercentage : 0;
            let discountValue = discountPercentage > 0 ? productPrice * quantity * (discountPercentage/100) : 0;
            let subtotal = (productPrice * quantity) - discountValue;
            this.registerIntoCart(productCategory, productName, productPrice, quantity, discountPercentage, discountValue, subtotal);
        } else {
            alert("Opción no válida");
            this.selectProduct();
        }    
    }

    filterProducts() {
        let productsArray = Object.values(this.products.getProducts());
        let productsFiltered = productsArray.filter(product => product.category === this.category);
        return productsFiltered;
    }

    registerIntoCart(category, productName, price, quantity, DiscountPercentage, DiscountValue, subtotal) {
        this.cart.push({
            date : this.utils.formatDate(),
            hour: this.utils.formatHour(),
            category,
            productName,
            price,
            quantity,
            DiscountPercentage,
            DiscountValue,
            subtotal
        });
    }

    addMoreProducts() {
        let option = Number(prompt(
            "Desea agregar más productos al carrito? \n1. Sí \n2. No"
        ));
        if (option === 1) {
            this.addProductstoCart();
        } else {
        this.menu.mainMenu(); 
        }
    }

    viewCart() {
        if(this.cart.length === 0){
            alert("No hay productos en el carrito");
            this.menu.mainMenu();
        }else{
            console.log("Productos en el carrito: ");
            console.log("Ind. Prod - Precio - Cant - %Desc - Descuento - Subtotal");
            this.cart.forEach((product, index) => {
                console.log(`${index + 1}. -> ${product.productName} - $${product.price} - ${product.quantity} - ${product.DiscountPercentage}% - $(${product.DiscountValue}) - $${product.subtotal}`);
            });
            this.menu.mainMenu();
        }
    }

    cleanCart() {
        this.cart = [];
        this.menu.mainMenu();
    }

    getCart() {
        return this.cart;
    }
    
}