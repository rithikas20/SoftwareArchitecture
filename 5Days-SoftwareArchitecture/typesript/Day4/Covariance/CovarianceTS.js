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
    function Account(id, bal) {
        this.id = id;
        this.bal = bal;
    }
    Account.prototype.show = function () { console.log("Account", this.id); };
    return Account;
}());
var SavingsAccount = /** @class */ (function (_super) {
    __extends(SavingsAccount, _super);
    function SavingsAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SavingsAccount.prototype.applyInterest = function () { this.bal *= 1.05; };
    return SavingsAccount;
}(Account));
var sav = [new SavingsAccount("S1", 1000)];
// Arrays in TS are covariant: allowed (but unsafe for mutations)
var acctArr = sav; // allowed
// acctArr.push(new Account("A1",0)); // allowed too -> may corrupt savings array
console.log("UNSAFE covariance (mutable arrays): pushing a plain Account into acctArr corrupts sav.");
// Safe covariance: ReadonlyArray<T>
var readSav = [new SavingsAccount("S2", 2000)];
var readAcct = readSav; // allowed and safe (read-only)
console.log("SAFE covariance: ReadonlyArray<SavingsAccount> -> ReadonlyArray<Account> (read-only).");
