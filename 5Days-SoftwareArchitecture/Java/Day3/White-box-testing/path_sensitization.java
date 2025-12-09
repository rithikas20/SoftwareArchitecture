class BankService {

    /**
     * Bank withdraw method with path sensitization example.
     */
    public void withdraw(double balance, double amount, boolean otpVerified, boolean isHoliday, boolean isVIP) {
        // Path P1: No balance
        if (balance <= 0) {
            System.out.println("No balance");       // P1
        } 
        // Path P2: Amount exceeds balance
        else if (amount > balance) {
            System.out.println("Insufficient");    // P2
        } 
        // Path P3: OTP not verified
        else if (!otpVerified) {
            System.out.println("OTP not verified"); // P3
        } 
        // Path P4: Bank closed
        else if (isHoliday) {
            System.out.println("Bank closed");     // P4
        } 
        // Path P5: Successful withdrawal
        else {
            System.out.println("Withdraw successful"); // P5
        }

        // Impossible path example (dead logic)
        // Condition: balance < 0 AND balance > 1000 at the same time → cannot happen
        if (balance < 0 && balance > 1000) { 
            System.out.println("Impossible Path Reached!"); // P6: DEAD LOGIC
        }
    }
}

public class path_sensitization {
    public static void main(String[] args) {
        BankService bank = new BankService();

        System.out.println("=== Test Case 1: No balance ===");
        bank.withdraw(0, 100, true, false, false);  // P1

        System.out.println("\n=== Test Case 2: Insufficient balance ===");
        bank.withdraw(500, 1000, true, false, false); // P2

        System.out.println("\n=== Test Case 3: OTP not verified ===");
        bank.withdraw(1000, 500, false, false, false); // P3

        System.out.println("\n=== Test Case 4: Bank holiday ===");
        bank.withdraw(1000, 500, true, true, false); // P4

        System.out.println("\n=== Test Case 5: Successful withdrawal ===");
        bank.withdraw(1000, 500, true, false, false); // P5

        System.out.println("\n=== Test Case 6: Impossible path (DEAD LOGIC) ===");
        bank.withdraw(-10, 2000, true, false, false); // P6 → Sensitized, impossible
    }
}
