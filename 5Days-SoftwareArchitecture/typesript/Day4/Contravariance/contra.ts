class Account { 
    constructor(public id: string) {} 
}
class SavingsAccount extends Account { 
    applyInterest() { console.log("Interest applied!"); } 
}

// Contravariant example (safe)
let handleAnyAccount: (a: Account) => void = (a) => console.log("Account ID:", a.id);
let handleSavings: (s: SavingsAccount) => void;

handleSavings = handleAnyAccount; // ✅ safe contravariant assignment
handleSavings(new SavingsAccount("S1")); // works

// Bivariance example (unsafe if TS not strict)
let handleSavingsOnly: (s: SavingsAccount) => void = (s) => s.applyInterest();
let handleAny: (a: Account) => void;

handleAny = handleSavingsOnly; // ⚠ Allowed historically (bivariance), unsafe
handleAny(new Account("A1"));  // ❌ Runtime error if called
