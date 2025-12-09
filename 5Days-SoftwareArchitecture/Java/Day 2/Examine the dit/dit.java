class Account {        // DIT = 0
    void process() {
        System.out.println("Account: Basic processing");
    }
}

class SavingsAccount extends Account {    // DIT = 1
    void process() {
        System.out.println("SavingsAccount: Add interest");
        super.process();
    }
}

class PremiumSavingsAccount extends SavingsAccount {   // DIT = 2
    void process() {
        System.out.println("PremiumSavings: Add rewards");
        super.process();
    }
}

public class dit {
    public static void main(String[] args) {
        PremiumSavingsAccount acc = new PremiumSavingsAccount();
        acc.process();
    }
}
