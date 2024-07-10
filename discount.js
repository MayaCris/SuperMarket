export class Discount {

    constructor() {}

    calculateDiscount(category, quantity) {
        if (category === "Cuidado Personal") {
            if (quantity > 0 && quantity <= 4) {
                return 0.05;
            } else if (quantity > 4 && quantity <= 10) {
                return 0.1;
            } else if (quantity >= 11) {
                return 0.15;
            } else {
                return 0;
            }
        }
    }

}