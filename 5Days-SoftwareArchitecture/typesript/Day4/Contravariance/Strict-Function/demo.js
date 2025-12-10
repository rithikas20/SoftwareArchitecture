"use strict";
// strictFunctionTypes_demo.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Enable strictFunctionTypes in tsconfig.json or with CLI:
// tsc strictFunctionTypes_demo.ts --noEmit --strictFunctionTypes
class Account {
    id;
    constructor(id) {
        this.id = id;
    }
}
class SavingsAccount extends Account {
    applyInterest() {
        console.log("Interest applied to", this.id);
    }
}
// Function that only accepts SavingsAccount
let handleSavingsOnly = (s) => s.applyInterest();
// Function that can accept any Account
let handleAny;
handleAny = handleSavingsOnly; // Compile-time error: unsafe assignment blocked
console.log("With strictFunctionTypes, unsafe assignments are prevented!");
//# sourceMappingURL=demo.js.map