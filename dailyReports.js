import { Sales } from './sales.js';

export class DailyReports {
    constructor(menu) {
        this.sales = new Sales();
        this.menu = menu;

    }

    menuReports(sales) {
        let option = Number(prompt('Ingrese el número de la opción que desea realizar: \n1. Reporte de ventas por día. \n2. Reporte de ventas por hora. \n3. Reporte de ventas por categoría \n4. Regresar al menú principal'));
        switch (option) {
            case 1:
                this.dailySalesReport(sales);
                this.menu.mainMenu();
                break;
            case 2:
                this.hourlySalesReport(sales);
                this.menu.mainMenu();
                break;
            case 3:
                this.categorySalesReport(sales);
                this.menu.mainMenu();
                break;
            case 4:
                this.menu.mainMenu();
                break;
            default:
                alert('Opción no válida');
                this.menuReports();
        }
    }

    dailySalesReport(sales) {
        let date = prompt('Ingrese la fecha de la que desea ver el reporte de ventas (DD/MM/YYYY)');
        let dailySales = sales.filter(sale => sale.date === date);
        console.log("---------------------------------------------------")
        console.log("Reporte de ventas del día " + date);
        dailySales.forEach(sale => {
            console.log(`Factura: ${sale.numberInvoice} - Fecha: ${sale.date} - total: ${sale.total}`)
            sale.products.forEach(product => {
                console.log(`Producto: ${product.productName} - Precio: ${product.price} - Cantidad: ${product.quantity} - Descuento: ${product.DiscountValue} - Subtotal: ${product.subtotal}`)
            });
        });
        let total = dailySales.reduce((acc, sale) => acc + sale.total, 0);
        console.log(`El total de ventas del día ${date} es de: ${total}`);
        console.log("---------------------------------------------------")
    }

    hourlySalesReport(sales) {
        let salesByHour = sales.reduce((acc, sale) => {
            if (!acc[sale.hour]) {
                acc[sale.hour] = 0;
            }
            acc[sale.hour] += sale.total;
            return acc;
        }, {});
        let groupedSalesArray = Object.keys(salesByHour).map(hour => {
            return { hour: hour, total: salesByHour[hour] };
        });
        console.log("---------------------------------------------------")
        console.log("Reporte de ventas por hora");
        let sortedSales = groupedSalesArray.sort((a, b) => b.total - a.total);
        sortedSales.forEach(sale => {
            let hour = sale.hour;
            let total = sale.total;
            console.log(`Hora: ${hour} - Total de ventas: ${total}`);
        });
        let total = sortedSales.reduce((acc, sale) => acc + sale.total, 0);
        console.log(`El total de ventas por hora es de: ${total}`);
        console.log("---------------------------------------------------")
    }

    categorySalesReport(sales) {
        let salesByCategory = sales.reduce((acc, sale) => {
            sale.products.forEach(product => {
                if (!acc[product.category]) {
                    acc[product.category] = 0;
                }
                acc[product.category] += product.subtotal;
            });
            return acc;
        }, {});
        let groupedSalesArray = Object.keys(salesByCategory).map(category => {
            return { category: category, total: salesByCategory[category] };
        });
        let sortedSales = groupedSalesArray.sort((a, b) => b.total - a.total);
        console.log("---------------------------------------------------")
        console.log("Reporte de ventas por categoría");
        sortedSales.forEach(sale => {
            let category = sale.category;
            let total = sale.total;
            console.log(`Categoría: ${category} - Total de ventas: ${total}`);
        });
        let total = sortedSales.reduce((acc, sale) => acc + sale.total, 0);
        console.log(`El total de ventas por categoría es de: ${total}`);
        console.log("---------------------------------------------------")

    }
}