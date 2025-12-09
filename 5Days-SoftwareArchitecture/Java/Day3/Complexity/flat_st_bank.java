class BankServiceOptimized {

    public void withdraw(double balance, double amount, boolean otpVerified, boolean isHoliday, String accountType) {

        if (balance <= 0) {
            System.out.println("Cannot withdraw: Balance must be positive.");
            return;
        }

        if (amount > balance) {
            System.out.println("Cannot withdraw: Insufficient balance.");
            return;
        }

        if (!otpVerified) {
            System.out.println("Cannot withdraw: OTP not verified.");
            return;
        }

        if (isHoliday) {
            System.out.println("Cannot withdraw: Bank is closed (holiday).");
            return;
        }

        switch (accountType) {
            case "SAVINGS" -> System.out.println("Withdraw Successful from Savings");
            case "CURRENT" -> System.out.println("Withdraw Successful from Current");
            default -> System.out.println("Invalid Account Type");
        }
    }
}

public class flat_st_bank {

    public static void main(String[] args) {

        BankServiceOptimized svc = new BankServiceOptimized();

        System.out.println("=== Test 1: Successful withdraw (SAVINGS) ===");
        svc.withdraw(1000.0, 200.0, true, false, "SAVINGS");

        System.out.println("\n=== Test 2: Successful withdraw (CURRENT) ===");
        svc.withdraw(800.0, 300.0, true, false, "CURRENT");

        System.out.println("\n=== Test 3: Insufficient balance ===");
        svc.withdraw(200.0, 500.0, true, false, "SAVINGS");

}

}