// contravariance.ts
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
var Account = /** @class */ (function () {
    function Account(id) {
        this.id = id;
    }
    return Account;
}());
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SavingsAccount.prototype.applyInterest = function () { console.log("Interest applied to", this.id); };
    return SavingsAccount;
}(Account));
// Function that accepts any Account
var handleAnyAccount = function (a) { return console.log("Account ID:", a.id); };
// Function that accepts only SavingsAccount
var handleSavings;
// ✅ Safe contravariant assignment:
// A function that accepts any Account can be used where a SavingsAccount function is expected
handleSavings = handleAnyAccount;
handleSavings(new SavingsAccount("S1")); // works fine
