class Account {
  constructor(public id: string) {}
}

class SavingsAccount extends Account {
  applyInterest() {
    console.log("Interest applied to", this.id);
  }
}

// Function that only accepts SavingsAccount
let handleSavingsOnly: (s: SavingsAccount) => void = (s) => s.applyInterest();

// Function that can accept any Account
let handleAny: (a: Account) => void;


handleAny = handleSavingsOnly; // Compile-time error: unsafe assignment blocked

console.log("With strictFunctionTypes, unsafe assignments are prevented!");
