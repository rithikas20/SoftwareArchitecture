class BankService {

    public void withdraw(double balance, double amount, boolean otpVerified, boolean isHoliday, String accountType) {

        if (balance > 0) {                                 // 1
            if (amount <= balance) {                      // 2
                if (otpVerified) {                        // 3
                    if (!isHoliday) {                     // 4
                        switch (accountType) {            // 5
                            case "SAVINGS":
                                System.out.println("Withdraw Successful from Savings");
                                break;
                            case "CURRENT":
                                System.out.println("Withdraw Successful from Current");
                                break;
                            default:
                                System.out.println("Invalid Account");
                                break;
                        }
                    } else {
                        System.out.println("Cannot withdraw: Bank is closed today (holiday).");
                    }
                } else {
                    System.out.println("Cannot withdraw: OTP not verified.");
                }
            } else {
                System.out.println("Cannot withdraw: Insufficient balance.");
            }
        } else {
            System.out.println("Cannot withdraw: Account balance must be positive.");
        }
    }
}

public class bad_nested_bank {
    public static void main(String[] args) {
        BankService svc = new BankService();

        System.out.println("=== Test 1: Successful withdraw (SAVINGS) ===");
        svc.withdraw(1000.0, 100.0, true, false, "SAVINGS");

        System.out.println("\n=== Test 2: Successful withdraw (CURRENT) ===");
        svc.withdraw(500.0, 200.0, true, false, "CURRENT");

    }
}
