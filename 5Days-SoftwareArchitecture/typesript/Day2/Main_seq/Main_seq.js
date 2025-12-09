// Concrete component
var CustomerManager = /** @class */ (function () {
    function CustomerManager() {
    }
    CustomerManager.prototype.processTransaction = function (amount) {
        console.log("Processing customer transaction: \u20B9".concat(amount));
    };
    return CustomerManager;
}());
// Usage
var service = new CustomerManager();
service.processTransaction(500);
