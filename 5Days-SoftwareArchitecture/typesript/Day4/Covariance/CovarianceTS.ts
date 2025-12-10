class Account { 
    constructor(public id: string, public bal: number)
     {} 

     show()
     { console.log("Account", this.id); } 
    
}
class SavingsAccount extends Account { applyInterest(){ this.bal *= 1.05; } }

const sav: SavingsAccount[] = [ new SavingsAccount("S1",1000) ];

// Arrays in TS are covariant: allowed (but unsafe for mutations)
const acctArr: Account[] = sav; // allowed
// acctArr.push(new Account("A1",0)); // allowed too -> may corrupt savings array

console.log("UNSAFE covariance (mutable arrays): pushing a plain Account into acctArr corrupts sav.");

// Safe covariance: ReadonlyArray<T>
const readSav: ReadonlyArray<SavingsAccount> = [ new SavingsAccount("S2",2000) ];
const readAcct: ReadonlyArray<Account> = readSav; // allowed and safe (read-only)
console.log("SAFE covariance: ReadonlyArray<SavingsAccount> -> ReadonlyArray<Account> (read-only).");
