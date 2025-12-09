type TxResult = "SUCCESS" | "INSUFFICIENT_FUNDS" | "ERROR";

class AccountServiceGood {
    withdraw(amount: number): TxResult {
        return "INSUFFICIENT_FUNDS";
    }
}

class ClientMeaningGood {
    private svc = new AccountServiceGood();

    attempt() {
        const result = this.svc.withdraw(500);
        if (result === "INSUFFICIENT_FUNDS")
            console.log("Insufficient funds (explicit)");
    }
}

new ClientMeaningGood().attempt();
