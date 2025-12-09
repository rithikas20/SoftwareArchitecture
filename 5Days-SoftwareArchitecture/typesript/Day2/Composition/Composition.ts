// BankAccount class
class BankAccount {
    deposit(amount: number) {
        console.log(`Deposited: ₹${amount}`);
    }

    withdraw(amount: number) {
        console.log(`Withdrawn: ₹${amount}`);
    }
}

// Customer class uses BankAccount (composition)
class Customer {
    private account: BankAccount; // Customer has a BankAccount

    constructor(account: BankAccount) {
        this.account = account;
    }

    performTransactions() {
        this.account.deposit(1000);
        this.account.withdraw(500);
        console.log("Transaction completed successfully");
    }
}

// Main execution
const account = new BankAccount();
const customer = new Customer(account);

customer.performTransactions();
