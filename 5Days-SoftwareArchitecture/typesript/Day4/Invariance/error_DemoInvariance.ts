// Parent class
class BankAccount {
  constructor(public balance: number) {}
  deposit(amount: number) {
    this.balance += amount;
  }
}

// Child classes
class SavingAccount extends BankAccount {
  addInterest() {
  }
}

class CurrentAccount extends BankAccount {
  deductMaintenanceFee() {
  }
}

// Generic BankBox<T> (Invariant)
class BankBox<T> {
  account: T;
  constructor(account: T) {
    this.account = account;
  }
}

// Instances
let savingBox: BankBox<SavingAccount> = new BankBox(new SavingAccount(5000));
let currentBox: BankBox<CurrentAccount> = new BankBox(new CurrentAccount(8000));

// Compile-time Error (Invariance):
// Type 'BankBox<SavingAccount>' is not assignable to type 'BankBox<CurrentAccount>'
currentBox = savingBox;

console.log("This line will NOT run because TS blocks the assignment.");
