class BankService {
    void deposit(double amount) {        // method name: deposit
        System.out.println("Deposited ₹" + amount);
    }
}

class Customer {
    private BankService bank = new BankService();

    void doDeposit() {
        bank.deposit(1000);              // must use same name 'deposit'
    }
}

public class CoN_Name {
    public static void main(String[] args) {
        new Customer().doDeposit();
    }
}
