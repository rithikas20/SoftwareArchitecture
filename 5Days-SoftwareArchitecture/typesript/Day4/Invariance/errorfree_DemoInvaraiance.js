var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Parent class
var BankAccount = /** @class */ (function () {
    function BankAccount(balance) {
        this.balance = balance;
    }
    BankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    return BankAccount;
}());
// Child classes
var SavingAccount = /** @class */ (function (_super) {
    __extends(SavingAccount, _super);
    function SavingAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SavingAccount.prototype.addInterest = function () {
    };
    return SavingAccount;
}(BankAccount));
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurrentAccount.prototype.deductMaintenanceFee = function () {
    };
    return CurrentAccount;
}(BankAccount));
// Generic BankBox<T> (Invariant)
var BankBox = /** @class */ (function () {
    function BankBox(account) {
        this.account = account;
    }
    return BankBox;
}());
// Instances
var savingBox = new BankBox(new SavingAccount(5000));
var currentBox = new BankBox(new CurrentAccount(8000));
// Compile-time Error (Invariance):
// Type 'BankBox<SavingAccount>' is not assignable to type 'BankBox<CurrentAccount>'
//currentBox = savingBox;
console.log("This line will  run now.");
