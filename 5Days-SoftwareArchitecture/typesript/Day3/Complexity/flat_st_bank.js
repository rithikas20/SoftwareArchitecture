var BankServiceFlat = /** @class */ (function () {
    function BankServiceFlat() {
    }
    BankServiceFlat.prototype.withdraw = function (balance, amount, otpVerified, isHoliday, accountType) {
        //  flat and easy to read
        if (balance <= 0)
            return;
        if (amount > balance)
            return;
        if (!otpVerified)
            return;
        if (isHoliday)
            return;
        switch (accountType) {
            case "SAVINGS":
                console.log("Withdraw Successful from Savings");
                break;
            case "CURRENT":
                console.log("Withdraw Successful from Current");
                break;
            default:
                console.log("Invalid Account");
        }
    };
    return BankServiceFlat;
}());
var svcFlat = new BankServiceFlat();
svcFlat.withdraw(1000, 100, true, false, "CURRENT");
