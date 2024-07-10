import { Utils } from './utils.js';

export class Sales {
    constructor(menu) {
        this.utils = new Utils();
        this.menu = menu;
        this.sales = [];
        this.invoiceNumber = 0;
    }

    generateAndShowBill(cart){
        this.registerSale(cart);
        this.showInvoice();
        console.log(this.sales);

    }
    registerSale(cart) {
        if(cart.length === 0){
            alert("No hay productos en el carrito. No se puede generar la factura.");
            this.menu.mainMenu();
        }else{
            this.sales.push({
                numberInvoice: this.generateInvoiceNumber(),
                date : this.utils.formatDate(),
                hour: this.utils.formatHour(),
                products: [...cart],
                discount: this.calculateTotalDiscount(cart),
                total: this.calculateTotal(cart)
            });
        }
        
    }

    calculateTotal(cart){
        let total = cart.reduce((acc, product) => 
            acc + product.subtotal, 0);
        return total;
    }

    calculateTotalDiscount(cart){
        let totalDiscount = cart.reduce((acc, product) => 
            acc + product.DiscountValue, 0);
        return totalDiscount;
    }

    generateInvoiceNumber(){
        return ++this.invoiceNumber;
        
    }

    showInvoice(){
        if(this.sales.length === 0){
            alert("No hay facturas generadas");
            this.menu.mainMenu();
        }else{
            let invoice = this.sales[this.sales.length - 1];
            console.log(`---------------------------SuperMarket---------------------------`);
            console.log(`Factura número: ${invoice.numberInvoice}`);
            console.log(`Fecha: ${invoice.date}`);
            console.log(`Productos: `);
            invoice.products.forEach(product => {
                console.log(`Producto: ${product.productName} Precio: $${product.price} Cantidad: ${product.quantity} Descuento: $${product.DiscountValue} Subtotal: $${product.subtotal}`);
            });
            console.log(`Descuento total: ${invoice.discount}`);
            console.log(`Total: ${invoice.total}`);
            console.log(`------------------------------------------------------------------`);
        }
    }

    getSales() {
        return this.sales;
      }

}