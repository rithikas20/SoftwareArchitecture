class PaymentGateway {
    void transfer(double amount) { // expects double
        System.out.println("Transferred ₹" + amount);
    }
}

class ClientType {
    private PaymentGateway gateway = new PaymentGateway();

    void makeTransfer() {
        gateway.transfer(2500.50); // must pass correct type: double
    }
}

public class CoN_Type {
    public static void main(String[] args) {
        new ClientType().makeTransfer();
    }
}
