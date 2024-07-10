export class Products {
  constructor() {
    this.products = {
      1: { name: 'Pan', category: 'Alimentos', price: 3500 },
      2: { name: 'Manzanas', category: 'Alimentos', price: 7000 },
      3: { name: 'Pasta', category: 'Alimentos', price: 2500 },
      4: { name: 'Queso', category: 'Alimentos', price: 6000 },
      5: { name: 'Agua', category: 'Bebidas', price: 2200 },
      6: { name: 'Jugo de naranja', category: 'Bebidas', price: 7500 },
      7: { name: 'Refresco de cola', category: 'Bebidas', price: 6000 },
      8: { name: 'Té verde', category: 'Bebidas', price: 6400 },
      9: { name: 'Champú', category: 'Cuidado Personal', price: 17000 },
      10: { name: 'Pasta de dientes', category: 'Cuidado Personal', price: 16000 },
      11: { name: 'Jabón líquido', category: 'Cuidado Personal', price: 13000 },
      12: { name: 'Desodorante', category: 'Cuidado Personal', price: 19000 }
    }
  };


  addProduct(product) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

}