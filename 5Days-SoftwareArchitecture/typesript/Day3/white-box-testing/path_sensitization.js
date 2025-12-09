var BankService = /** @class */ (function () {
    function BankService() {
    }
    BankService.prototype.withdraw = function (balance, amount, otpVerified, isHoliday, isVIP) {
        // Path P1: No balance
        if (balance <= 0) {
            console.log("No balance"); // P1
        }
        // Path P2: Amount exceeds balance
        else if (amount > balance) {
            console.log("Insufficient"); // P2
        }
        // Path P3: OTP not verified
        else if (!otpVerified) {
            console.log("OTP not verified"); // P3
        }
        // Path P4: Bank closed
        else if (isHoliday) {
            console.log("Bank closed"); // P4
        }
        // Path P5: Successful withdrawal
        else {
            console.log("Withdraw successful"); // P5
        }
        // Impossible path example (dead logic)
        if (balance < 0 && balance > 1000) {
            console.log("Impossible Path Reached!"); // P6: DEAD LOGIC
        }
    };
    return BankService;
}());
// Test the BankService
var bank = new BankService();
console.log("=== Test Case 1: No balance ===");
bank.withdraw(0, 100, true, false, false); // P1
console.log("\n=== Test Case 2: Insufficient balance ===");
bank.withdraw(500, 1000, true, false, false); // P2
console.log("\n=== Test Case 3: OTP not verified ===");
bank.withdraw(1000, 500, false, false, false); // P3
console.log("\n=== Test Case 4: Bank holiday ===");
bank.withdraw(1000, 500, true, true, false); // P4
console.log("\n=== Test Case 5: Successful withdrawal ===");
bank.withdraw(1000, 500, true, false, false); // P5
console.log("\n=== Test Case 6: Impossible path (DEAD LOGIC) ===");
bank.withdraw(-10, 2000, true, false, false); // P6 → Sensitized, impossible
