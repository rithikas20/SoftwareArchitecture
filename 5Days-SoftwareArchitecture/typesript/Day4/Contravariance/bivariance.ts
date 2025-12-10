// bivariance.ts

class Account { 
    constructor(public id: string) {} 
}
class SavingsAccount extends Account { 
    applyInterest() { console.log("Interest applied to", this.id); } 
}

// Function that accepts only SavingsAccount
let handleSavingsOnly: (s: SavingsAccount) => void = (s) => s.applyInterest();

// Function that accepts any Account
let handleAny: (a: Account) => void;

// ⚠ Unsafe assignment allowed by TS historically (bivariance)
handleAny = handleSavingsOnly;

// Runtime danger:
handleAny(new Account("A1")); // Crash at runtime: applyInterest does not exist on Account
