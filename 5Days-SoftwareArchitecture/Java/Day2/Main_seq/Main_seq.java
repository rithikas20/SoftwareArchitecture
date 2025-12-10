// Abstract component (stable)
interface BankService {   // A = 1
    void processTransaction(double amount);
}

// Concrete component (unstable)
class CustomerManager implements BankService { // A = 0
    public void processTransaction(double amount) {
        System.out.println("Processing customer transaction: ₹" + amount);
    }
}

// Client code
public class Main_seq {
    public static void main(String[] args) {
        BankService service = new CustomerManager(); // depends on interface (good)
        service.processTransaction(500);
    }
}
