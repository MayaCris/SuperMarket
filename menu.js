// import { Products } from "./Products.js";
import { Cart } from "./cart.js";
import { Sales } from "./sales.js";
import { DailyReports } from "./dailyReports.js";


export class Menu {
    constructor() {
        this.cart = new Cart(this);
        this.sales = new Sales(this);
        this.dailyReports = new DailyReports(this);
    }
    mainMenu(){
        let option = Number(prompt(
            "Bienvenido al SuperMarket. Ingrese una de las siguientes opciones \n1. Agregar productos al carrito \n2. Ver productos en el carrito \n3. Vaciar carrito \n4. Generar y ver factura \n5. Menu de reportes \n6. Salir "
        ))
        switch (option) {
            case 1:
                this.cart.addProductstoCart();
                break;
            case 2:
                this.cart.viewCart();
                break;
            case 3:
                this.cart.cleanCart();
                break;
            case 4:
                this.sales.generateAndShowBill(this.cart.getCart());
                this.cart.cleanCart();
                break;
            case 5:
                this.dailyReports.menuReports(this.sales.getSales());
                break;
            case 6:
                break;
            default:
                alert("Opción no válida");
                this.mainMenu();
        }
    }
    
}

const app = new Menu();
document.getElementById("execute").addEventListener("click", () => {
    app.mainMenu();
});