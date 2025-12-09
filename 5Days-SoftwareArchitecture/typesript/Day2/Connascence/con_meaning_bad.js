var AccountServiceBad = /** @class */ (function () {
    function AccountServiceBad() {
    }
    AccountServiceBad.prototype.withdraw = function (amount) {
        return -1;
    };
    return AccountServiceBad;
}());
var ClientMeaningBad = /** @class */ (function () {
    function ClientMeaningBad() {
        this.svc = new AccountServiceBad();
    }
    ClientMeaningBad.prototype.attempt = function () {
        var result = this.svc.withdraw(500);
        if (result === -1)
            console.log("Insufficient funds (magic -1)");
    };
    return ClientMeaningBad;
}());
new ClientMeaningBad().attempt();
