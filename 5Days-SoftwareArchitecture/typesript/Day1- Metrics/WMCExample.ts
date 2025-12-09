// POOR: High WMC
class Processor {
    process(user: string, amount: number): void {
        if (user && user.length > 0) {
            if (amount > 0) {
                console.log("Valid user and amount, processing...");
                if (amount < 1000) console.log("Small payment, fast track");
                else console.log("Large payment, require approval");
            } else {
                console.log("Invalid amount!");
            }
        } else {
            console.log("Invalid user!");
        }
    }
}

// GOOD: Low WMC
class CleanProcessor {
    process(user: string, amount: number): void {
        if (!this.validateUser(user)) return;
        if (!this.validateAmount(amount)) return;
        this.handlePayment(amount);
    }

    private validateUser(user: string): boolean {
        if (!user || user.length === 0) {
            console.log("Invalid user!");
            return false;
        }
        return true;
    }

    private validateAmount(amount: number): boolean {
        if (amount <= 0) {
            console.log("Invalid amount!");
            return false;
        }
        return true;
    }

    private handlePayment(amount: number): void {
        console.log("Processing payment:", amount);
        if (amount < 1000) console.log("Small payment, fast track");
        else console.log("Large payment, require approval");
    }
}

// Usage
new Processor().process("Alice", 500);
new CleanProcessor().process("Bob", 1500);
