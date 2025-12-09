// POOR: High WMC
var Processor = /** @class */ (function () {
    function Processor() {
    }
    Processor.prototype.process = function (user, amount) {
        if (user && user.length > 0) {
            if (amount > 0) {
                console.log("Valid user and amount, processing...");
                if (amount < 1000)
                    console.log("Small payment, fast track");
                else
                    console.log("Large payment, require approval");
            }
            else {
                console.log("Invalid amount!");
            }
        }
        else {
            console.log("Invalid user!");
        }
    };
    return Processor;
}());
// GOOD: Low WMC
var CleanProcessor = /** @class */ (function () {
    function CleanProcessor() {
    }
    CleanProcessor.prototype.process = function (user, amount) {
        if (!this.validateUser(user))
            return;
        if (!this.validateAmount(amount))
            return;
        this.handlePayment(amount);
    };
    CleanProcessor.prototype.validateUser = function (user) {
        if (!user || user.length === 0) {
            console.log("Invalid user!");
            return false;
        }
        return true;
    };
    CleanProcessor.prototype.validateAmount = function (amount) {
        if (amount <= 0) {
            console.log("Invalid amount!");
            return false;
        }
        return true;
    };
    CleanProcessor.prototype.handlePayment = function (amount) {
        console.log("Processing payment:", amount);
        if (amount < 1000)
            console.log("Small payment, fast track");
        else
            console.log("Large payment, require approval");
    };
    return CleanProcessor;
}());
// Usage
new Processor().process("Alice", 500);
new CleanProcessor().process("Bob", 1500);
