var PaymentGateway = /** @class */ (function () {
    function PaymentGateway() {
    }
    PaymentGateway.prototype.transfer = function (amount) {
        console.log("Transferred \u20B9".concat(amount));
    };
    return PaymentGateway;
}());
var ClientType = /** @class */ (function () {
    function ClientType() {
        this.gateway = new PaymentGateway();
    }
    ClientType.prototype.makeTransfer = function () {
        this.gateway.transfer(2500.50); // must match type: number
    };
    return ClientType;
}());
new ClientType().makeTransfer();
