// BankAccount class
class BankAccount {
    void deposit(double amount) {
        System.out.println("Deposited: " + amount);
    }

    void withdraw(double amount) {
        System.out.println("Withdrawn: " + amount);
    }
}


class Customer {
    private BankAccount account; // Customer has a BankAccount

    Customer(BankAccount account) {
        this.account = account;
    }

    void performTransactions() {
        account.deposit(1000);
        account.withdraw(500);
        System.out.println("Transaction completed successfully");
    }
}


public class Composition {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(); // create account
        Customer customer = new Customer(acc); // attach to customer

        customer.performTransactions(); // using the account safely
    }
}
