// Abstract component
interface BankService {
    processTransaction(amount: number): void;
}

// Concrete component
class CustomerManager implements BankService {
    processTransaction(amount: number): void {
        console.log(`Processing customer transaction: ₹${amount}`);
    }
}

// Usage
const service: BankService = new CustomerManager();
service.processTransaction(500);
