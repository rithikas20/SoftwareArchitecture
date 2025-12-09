var BankServiceNested = /** @class */ (function () {
    function BankServiceNested() {
    }
    BankServiceNested.prototype.withdraw = function (balance, amount, otpVerified, isHoliday, accountType) {
        if (balance > 0) { // decision 1
            if (amount <= balance) { // decision 2
                if (otpVerified) { // decision 3
                    if (!isHoliday) { // decision 4
                        switch (accountType) { // decision 5 (switch)
                            case "SAVINGS": // case path 1
                                console.log("Withdraw Successful from Savings");
                                break;
                            case "CURRENT": // case path 2
                                console.log("Withdraw Successful from Current");
                                break;
                            default:
                                console.log("Invalid Account");
                                break;
                        }
                    }
                }
            }
        }
    };
    return BankServiceNested;
}());
var svc = new BankServiceNested();
svc.withdraw(1000, 100, true, false, "SAVINGS");
