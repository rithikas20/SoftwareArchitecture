var AccountServiceGood = /** @class */ (function () {
    function AccountServiceGood() {
    }
    AccountServiceGood.prototype.withdraw = function (amount) {
        return "INSUFFICIENT_FUNDS";
    };
    return AccountServiceGood;
}());
var ClientMeaningGood = /** @class */ (function () {
    function ClientMeaningGood() {
        this.svc = new AccountServiceGood();
    }
    ClientMeaningGood.prototype.attempt = function () {
        var result = this.svc.withdraw(500);
        if (result === "INSUFFICIENT_FUNDS")
            console.log("Insufficient funds (explicit)");
    };
    return ClientMeaningGood;
}());
new ClientMeaningGood().attempt();
