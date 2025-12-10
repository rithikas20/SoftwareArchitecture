// POOR: High WMC
class Processor {
    void process(String user, double amount) {
        if (user != null && !user.isEmpty()) {
            if (amount > 0) {
                System.out.println("Valid user and amount, processing...");
                if (amount < 1000) {
                    System.out.println("Small payment, fast track");
                } else {
                    System.out.println("Large payment, require approval");
                }
            } else {
                System.out.println("Invalid amount!");
            }
        } else {
            System.out.println("Invalid user!");
        }
    }
}

// GOOD: Low WMC (Split logic into multiple methods)
class CleanProcessor {
    void process(String user, double amount) {
        if (!validateUser(user)) return;
        if (!validateAmount(amount)) return;
        handlePayment(amount);
    }

    private boolean validateUser(String user) {
        if (user == null || user.isEmpty()) {
            System.out.println("Invalid user!");
            return false;
        }
        return true;
    }

    private boolean validateAmount(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid amount!");
            return false;
        }
        return true;
    }

    private void handlePayment(double amount) {
        System.out.println("Processing payment: " + amount);
        if (amount < 1000) System.out.println("Small payment, fast track");
        else System.out.println("Large payment, require approval");
    }
}

// Usage
public class WMCExample {
    public static void main(String[] args) {
        new Processor().process("Alice", 500);
        new CleanProcessor().process("Bob", 1500);
    }
}
