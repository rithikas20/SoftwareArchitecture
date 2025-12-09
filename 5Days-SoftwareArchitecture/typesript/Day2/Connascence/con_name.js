var BankService = /** @class */ (function () {
    function BankService() {
    }
    BankService.prototype.deposit = function (amount) {
        console.log("Deposited \u20B9".concat(amount));
    };
    return BankService;
}());
var Customer = /** @class */ (function () {
    function Customer() {
        this.bank = new BankService();
    }
    Customer.prototype.doDeposit = function () {
        this.bank.deposit(1000);
    };
    return Customer;
}());
new Customer().doDeposit();
