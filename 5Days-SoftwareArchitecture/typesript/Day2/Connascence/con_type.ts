class PaymentGateway {
    transfer(amount: number) {
        console.log(`Transferred ₹${amount}`);
    }
}

class ClientType {
    private gateway = new PaymentGateway();

    makeTransfer() {
        this.gateway.transfer(2500.50); // must match type: number
    }
}

new ClientType().makeTransfer();
