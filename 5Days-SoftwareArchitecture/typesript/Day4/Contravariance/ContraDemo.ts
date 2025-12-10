// contravariance.ts

class Account { 
    constructor(public id: string) {} 
}
class SavingsAccount extends Account { 
    applyInterest() { console.log("Interest applied to", this.id); } 
}

// Function that accepts any Account
let handleAnyAccount: (a: Account) => void = (a) => console.log("Account ID:", a.id);

// Function that accepts only SavingsAccount
let handleSavings: (s: SavingsAccount) => void;

// ✅ Safe contravariant assignment:
// A function that accepts any Account can be used where a SavingsAccount function is expected
handleSavings = handleAnyAccount;
handleSavings(new SavingsAccount("S1")); // works fine
