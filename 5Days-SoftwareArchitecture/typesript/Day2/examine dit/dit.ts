class Account {
  process() {
    console.log("Account: Basic processing");
  }
}

class SavingsAccount extends Account {
  process() {
    console.log("SavingsAccount: Add interest");
    super.process();
  }
}

class PremiumSavingsAccount extends SavingsAccount {
  process() {
    console.log("PremiumSavings: Add rewards");
    super.process();
  }
}

const acc = new PremiumSavingsAccount();
acc.process();
