class BankService {
    deposit(amount: number) {
        console.log(`Deposited ₹${amount}`);
    }
}

class Customer {
    private bank = new BankService();

    doDeposit() {
        this.bank.deposit(1000);
    }
}

new Customer().doDeposit();
