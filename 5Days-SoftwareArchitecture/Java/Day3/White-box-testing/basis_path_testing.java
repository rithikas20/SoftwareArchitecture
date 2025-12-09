class BankService {

    public void withdraw(double balance, double amount, boolean otpVerified) {
        if (balance <= 0) {
            System.out.println("No balance");
        } else if (amount > balance) {
            System.out.println("Insufficient balance");
        } else if (!otpVerified) {
            System.out.println("OTP not verified");
        } else {
            System.out.println("Withdraw successful");
        }
    }
}

public class basis_path_testing {
    public static void main(String[] args) {
        BankService bank = new BankService();

        System.out.println("=== Test Case 1: No balance ===");
        bank.withdraw(0, 100, true);

        System.out.println("\n=== Test Case 2: Insufficient balance ===");
        bank.withdraw(500, 1000, true);

        System.out.println("\n=== Test Case 3: OTP not verified ===");
        bank.withdraw(1000, 500, false);

        System.out.println("\n=== Test Case 4: Successful withdrawal ===");
        bank.withdraw(1000, 500, true);
    }
}
