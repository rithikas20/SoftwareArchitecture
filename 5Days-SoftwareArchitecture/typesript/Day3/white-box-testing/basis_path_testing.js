var BankService = /** @class */ (function () {
    function BankService() {
    }
    BankService.prototype.withdraw = function (balance, amount, otpVerified) {
        if (balance <= 0) {
            console.log("No balance");
        }
        else if (amount > balance) {
            console.log("Insufficient balance");
        }
        else if (!otpVerified) {
            console.log("OTP not verified");
        }
        else {
            console.log("Withdraw successful");
        }
    };
    return BankService;
}());
// Create an instance
var bank = new BankService();
// Test cases
console.log("=== Test Case 1: No balance ===");
bank.withdraw(0, 100, true);
console.log("\n=== Test Case 2: Insufficient balance ===");
bank.withdraw(500, 1000, true);
console.log("\n=== Test Case 3: OTP not verified ===");
bank.withdraw(1000, 500, false);
console.log("\n=== Test Case 4: Successful withdrawal ===");
bank.withdraw(1000, 500, true);
