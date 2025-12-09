// BankAccount class
var BankAccount = /** @class */ (function () {
    function BankAccount() {
    }
    BankAccount.prototype.deposit = function (amount) {
        console.log("Deposited: \u20B9".concat(amount));
    };
    BankAccount.prototype.withdraw = function (amount) {
        console.log("Withdrawn: \u20B9".concat(amount));
    };
    return BankAccount;
}());
// Customer class uses BankAccount (composition)
var Customer = /** @class */ (function () {
    function Customer(account) {
        this.account = account;
    }
    Customer.prototype.performTransactions = function () {
        this.account.deposit(1000);
        this.account.withdraw(500);
        console.log("Transaction completed successfully");
    };
    return Customer;
}());
// Main execution
var account = new BankAccount();
var customer = new Customer(account);
customer.performTransactions();
